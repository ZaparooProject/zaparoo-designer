import { cassetteColorVariations, referencColorTable, cassetteBaseTemplate } from './cassetteColorVariations.mjs';
import { readFileSync, writeFileSync } from 'fs';

const templateSvg = readFileSync('./scripts/cassette/cassetteMasterFile.svg', 'utf-8');
let importFile = readFileSync('./scripts/cassette/baseCodeFile.ts', 'utf-8');
let templateObject = '';

for (const variation of cassetteColorVariations) {
  const newTemplate = templateSvg
    .replace(referencColorTable.backColor, variation.backColor)
    .replace(referencColorTable.colorSpineTop, variation.colorSpineTop)
    .replace(referencColorTable.colorSpineBottom, variation.colorSpineBottom)
    .replace(referencColorTable.frontcolorTop, variation.frontcolorTop)
    .replace(referencColorTable.frontcolorBottom, variation.frontcolorTop)
    .replace(referencColorTable.loadingLogoBack, variation.loadingLogoBack)
    .replace(referencColorTable.loadingLogoSpine, variation.loadingLogoSpine)
    .replace(referencColorTable.loadingLogoFront, variation.loadingLogoFront)
    .replace(referencColorTable.nfcLogoBack, variation.nfcLogoBack)
    .replace(referencColorTable.nfcLogoSpine, variation.nfcLogoSpine)
    .replace(referencColorTable.nfcLogoFront, variation.nfcLogoFront);
  writeFileSync(`./src/assets/cassetteGenerated/${variation.label}.svg`, newTemplate);
  importFile = `${importFile}
import ${variation.label} from './assets/cassetteGenerated/${variation.label}.svg';`;
  
  templateObject = `${templateObject}${variation.label}:${cassetteBaseTemplate.replace('url: cassetTape,', `url: ${variation.label},`)}`;

  console.log(`Generated ${variation.label}`);
} 

writeFileSync(`./src/cassetteTemplates.ts`, `${importFile} export const cassetteTemplates = {
${templateObject}
};`);