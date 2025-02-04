import Typography from '@mui/material/Typography';

import './Carousel.css';
import { useAppDataContext } from '../contexts/appData';
import { templateAuthors } from '../templateAuthors';
import type { templateTypeV2 } from '../resourcesTypedef';
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
  const [items, setItems] = useState<(templateTypeV2 & { key: string })[]>([]);
  const [img, setImg] = useState<HTMLImageElement>();
  const [toLoad, setToLoad] = useState(0);

  useLayoutEffect(() => {
    setItems(availableTemplates);
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
    <div className="carousel-container">
      {/* <ThreeDCarousel onClick={console.log} /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '1.5em',
        }}
      >
        <div className="numberCircle">1</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            gap: '10px',
          }}
        >
          <Typography variant="h5" color="secondary">
            Select your media type:
          </Typography>
          <MediaTypeDropdown />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'left',
        }}
      >
        <div className="numberCircle">2</div>
        <Typography variant="h5" color="secondary">
          Pick one of {items.length} templates to get started:
        </Typography>
      </div>
      <div className="carousel-element">
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
    </div>
  );
});

export default TemplatesCarousel;
