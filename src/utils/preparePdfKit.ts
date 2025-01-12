import {
  addCanvasToPdfPage,
  createDownloadStream,
} from '../extensions/fabricToPdfKit';
import { type PrintOptions } from '../contexts/appData';
import { printTemplates } from '../printTemplates';
import { type CardData } from '../contexts/fileDropper';

const fromMMtoPoint = (x: number): number => (x / 25.4) * 72;
const fromPixToPoint = (x: number): number => (x / 300) * 72;

export const preparePdf = async (
  printOptions: PrintOptions,
  cards: CardData[],
) => {
  const { printerTemplateKey, cutMarks } = printOptions;
  const printerTemplate = printTemplates[printerTemplateKey];
  const {
    gridSize: _tmpGridSize,
    leftMargin, topMargin,
    paperSize,
    columns: _tmpColumns,
    rows: _tmpRows,
    rightMargin,
    bottomMargin
  } = printerTemplate;


  let ptPaperSize = paperSize;
  if (Array.isArray(paperSize)) {
    ptPaperSize = (paperSize as [number, number]).map(fromMMtoPoint) as [
      number,
      number,
    ];
  }

  const { default: PDFDocument } = await import(
    'pdfkit/js/pdfkit.standalone.js'
  );
  const pdfDoc = new PDFDocument({ autoFirstPage: false });
  const downloadPromise = createDownloadStream(pdfDoc);
  const paperHeightInPt = fromMMtoPoint(paperSize[1])
  const topMarginInPt = fromMMtoPoint(topMargin);
  const paperWidthInPt = fromMMtoPoint(paperSize[0])
  const leftMarginInPt = fromMMtoPoint(leftMargin);
  const rightMarginInPt = fromMMtoPoint(rightMargin || leftMargin);
  const bottomMarginInPt = fromMMtoPoint(bottomMargin || topMargin);

  const cutHelperX = new Set();
  const cutHelperY = new Set();

  // take first card and compare with paper size, then try to guess best way to fit
  const firstCard = cards[0];
  const firstCardTemplate = firstCard.template!;
  let widthInPt = fromPixToPoint(firstCardTemplate.media.width);
  let heightInPt = fromPixToPoint(firstCardTemplate.media.height);
  const availPaperWidth = paperWidthInPt - leftMarginInPt - rightMarginInPt;
  const availPaperHeight = paperHeightInPt - topMarginInPt - bottomMarginInPt;

  let rows = _tmpRows, columns = _tmpColumns;
  // the template media is counted always as horizontal/landscape.
  // isRotated means that it fits more prints if rotated as vertical
  // the paper template instead is defined as you would insert in the printer.
  let neutralTemplate: 'horizontal' | 'vertical' = 'horizontal';
  if (!_tmpColumns && !_tmpRows) {
    // naively divide width by width and height by height, find margins and spacing.
    const possibleRows = Math.floor(availPaperHeight / heightInPt);
    const possibleColums = Math.floor(availPaperWidth / widthInPt);
    const straightLabels = possibleRows * possibleColums;
    const possibleRowsRotated = Math.floor(availPaperHeight / widthInPt);
    const possibleColumsRotated = Math.floor(availPaperWidth / heightInPt);
    const rotatedLabels = possibleRowsRotated * possibleColumsRotated;
    if (straightLabels === rotatedLabels) {
      const marginsW = availPaperWidth - possibleColums * widthInPt;
      const marginsH = availPaperHeight - possibleRows * heightInPt;

      const marginsWR = availPaperWidth - possibleColumsRotated * heightInPt;
      const marginsHR = availPaperHeight - possibleRowsRotated * widthInPt;
      // this is bullshit. I ll think on how to choose
      if (Math.abs(marginsW - marginsH) > Math.abs(marginsWR - marginsHR)) {
        rows = possibleRowsRotated;
        columns = possibleColumsRotated;
        neutralTemplate = 'vertical';
      } else {
        rows = possibleRows;
        columns = possibleColums;
      }
      // choose the labels with more margin
    } else if (straightLabels > rotatedLabels) {
      rows = possibleRows;
      columns = possibleColums;
    } else {
      neutralTemplate = 'vertical';
      rows = possibleRowsRotated;
      columns = possibleColumsRotated;
    }
  }

  if (neutralTemplate === 'vertical') {
    [widthInPt, heightInPt] = [heightInPt, widthInPt];
  }

  const gridSize = _tmpGridSize.map(x => fromMMtoPoint(x));
  if (gridSize[0] === 0) {
    // determine grid size here
    gridSize[0] = availPaperWidth / columns;
    gridSize[1] = availPaperHeight / rows;
  }

  const labelsPerPage = rows * columns;


  const makeTheCropMarks = () => {
    pdfDoc.lineWidth(0.2);
    // for each xValue draw 2 vertical lines from 0 to topMargin and from end of page to -topMargin.
    cutHelperX.forEach((xValue) => {
      pdfDoc.moveTo(xValue, 0);
      pdfDoc.lineTo(xValue, topMarginInPt);
      pdfDoc.moveTo(xValue, paperHeightInPt - topMarginInPt - 1);
      pdfDoc.lineTo(xValue, paperHeightInPt);
    });
    // for each xValue draw 2 vertical lines from 0 to topMargin and from end of page to -topMargin.
    cutHelperY.forEach((yValue) => {
      pdfDoc.moveTo(0, yValue);
      pdfDoc.lineTo(leftMarginInPt, yValue);
      pdfDoc.moveTo(paperWidthInPt - leftMarginInPt, yValue);
      pdfDoc.lineTo(paperWidthInPt, yValue);
    });
    pdfDoc.stroke();
    cutHelperX.clear();
    cutHelperY.clear();
  }

  if (cards) {

    let pageNumber = 0;
    pdfDoc.addPage({ margins: 0, size: ptPaperSize });
    pdfDoc.switchToPage(pageNumber);
    for (let index = 0; index < cards.length; index++) {
      const { canvas, template } = cards[index];
      const { printableAreas } = template!;
      const newPageNumber = Math.floor(index / labelsPerPage);
      if (newPageNumber > pageNumber) {
        // do the cropmarks
        cutMarks === 'crop' && makeTheCropMarks();
        pageNumber = newPageNumber;
        pdfDoc.addPage({ margins: 0, size: ptPaperSize });
        pdfDoc.switchToPage(pageNumber);
      }
      const column = index % columns;
      const row = Math.floor(index / columns) % rows;

      const xStart = column * gridSize[0] + leftMarginInPt + (gridSize[0] - widthInPt) / 2;
      const yStart = row * gridSize[1] + topMarginInPt + (gridSize[1] - heightInPt) / 2;

      if (cutMarks === 'crop' ) {
        if (printableAreas) {
          printableAreas.forEach(({ x, y, width, height }) => {
            cutHelperX.add(xStart + x * widthInPt);
            cutHelperX.add(xStart + x * widthInPt + width * widthInPt);
            cutHelperY.add(yStart + y * heightInPt);
            cutHelperY.add(yStart + y * heightInPt + height * heightInPt);
          });
        } else {
          cutHelperX.add(xStart);
          cutHelperX.add(xStart + widthInPt);
          cutHelperY.add(yStart);
          cutHelperY.add(yStart + heightInPt);
        }
      }

      const needsRotation = cards[index].template!.layout !== neutralTemplate;

      await addCanvasToPdfPage(
        canvas!,
        pdfDoc,
        {
          x: xStart,
          y: yStart,
          width: widthInPt,
          height: heightInPt,
        },
        needsRotation,
        template!,
        printOptions.imageType !== 'vector' // print as raster?
      );
    }
  }
  cutMarks === 'crop' && makeTheCropMarks();
  pdfDoc.end();
  downloadPromise.then((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'test.pdf';
    link.click();
    link.remove();
  });
};
