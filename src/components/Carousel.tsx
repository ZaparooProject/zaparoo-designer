import Typography from '@mui/material/Typography';
import { mediaTargetList } from '../printMediaTypes';

import './Carousel.css';
import { useAppDataContext } from '../contexts/appData';
import { templateAuthors } from '../templateAuthors';
import type { templateType, templateTypeV2 } from '../resourcesTypedef';
import {
  useState,
  useLayoutEffect,
  useEffect,
  memo,
  startTransition,
} from 'react';
import MediaTypeDropdown from './MediaTypeDropdown';
import sob3 from '../assets/art/sampleart.png';
import { prepareTemplateCarousel } from '../utils/prepareTemplateCarousel';
import { useFileDropperContext } from '../contexts/fileDropper';
// import { ThreeDCarousel } from './ThreeDCarousel';
import { util } from 'fabric';

const getTemplateId = (id: string) => `template_replace_${id}`;

const TemplatesCarousel = memo(() => {
  const { setTemplate, availableTemplates } = useAppDataContext();
  const { setFiles } = useFileDropperContext();
  const [items, setItems] = useState<(templateType & { key: string })[]>([]);
  const [img, setImg] = useState<HTMLImageElement>();
  const [toLoad, setToLoad] = useState(0);

  useLayoutEffect(() => {
    setItems(
      availableTemplates.filter(
        (tData) =>
          (!!tData.overlay ||
            !!tData.background ||
            (tData as templateTypeV2).version === 2) &&
          !tData.key.includes('blank'),
      ),
    );
    setToLoad(0);
  }, [availableTemplates]);

  useEffect(() => {
    util.loadImage(sob3).then((img) => setImg(img));
  }, []);

  useEffect(() => {
    if (img && toLoad < items.length) {
      prepareTemplateCarousel([items[toLoad]], img).then(([canvas]) => {
        const template = items[toLoad];
        const id = getTemplateId(template.key);
        const div = document.getElementById(id);
        if (div?.firstChild) {
          div.removeChild(div.firstChild);
        }
        if (div) {
          div.appendChild(canvas);
        }
        setToLoad(toLoad + 1);
      });
    }
  }, [items, img, toLoad]);

  return (
    <>
      {/* <ThreeDCarousel onClick={console.log} /> */}
      <Typography variant="h3" color="primary">
        Click a template from the {items.length} availables to get started:
      </Typography>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Typography variant="h5" color="secondary">
          Or change the card type to one of the {mediaTargetList.length}{' '}
          available:
        </Typography>
        <MediaTypeDropdown />
      </div>
      <div className="carousel-container">
        <div className="carousel-scroll">
          {items.map((tData) => (
            <div
              className="carouselItem-externals"
              onDragStart={(e) => {
                e.preventDefault();
                return false;
              }}
              key={tData.key}
            >
              <div
                className={`carouselItem ${tData.layout}`}
                id={getTemplateId(tData.key)}
                key={tData.key}
                onClick={() => {
                  setTemplate(tData);
                  if (img) {
                    startTransition(() => {
                      setFiles([img]);
                    });
                  }
                }}
              ></div>
              <Typography className="carouselCaption">
                {tData.label}
                <br />
                by
                <br />
                {templateAuthors[tData.author].name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default TemplatesCarousel;
