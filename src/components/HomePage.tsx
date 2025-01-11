import Typography from '@mui/material/Typography';
import bgUrl from '../assets/homebg.jpg';
import logoUrl from '../assets/zaparoo.png';
import examplesUrl from '../assets/tapto_cards.jpg';
import { templateAuthors } from '../templateAuthors';

import './HomePage.css';
import { Fragment, lazy } from 'react';

const Carousel = lazy(() => import('./Carousel'));

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="topBanner" style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className="bannerContent">
          <div className="central">
            <div>
              <img
                style={{ width: '260px', height: 'auto', marginBottom: '10px' }}
                src={logoUrl}
              />
              <Typography variant="h4">DESIGNER</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="choose-template">
        <div className="textLayout">
          <Carousel />
        </div>
      </div>
      <div className="content">
        <div className="textLayout">
          <Typography variant="h3">What's Zaparoo Designer?</Typography>
          <img style={{ marginBottom: '18px' }} src={examplesUrl} />
          <Typography>
            Having your favorite artwork on your NFC token is the perfect
            finishing touch for your Zaparoo collection. Zaparoo Designer
            streamlines this process to accomodate every skill level.
          </Typography>
          <Typography>
            Simply upload your artwork, choose from a variety of label
            templates, and export in a growing number of print ready formats.
            Not sure where to get artwork? No worries! We have you covered with
            our integrated game search tools.
          </Typography>
        </div>
      </div>
      <div className="credits">
        <div className="textLayout">
          <Typography variant="h3">
            Made with ❤️ by{' '}
            <a href="https://github.com/asturur">Andrea Bogazzi</a>
            <br />
            Designed by <a href="https://timwilsie.com/">Tim Wilsie</a>
            <br />
            Templates provided by{' '}
            {Object.values(templateAuthors).map(({ name, href }, index) => (
              <Fragment key={name}>
                <a key={`auth_${index}`} href={href}>
                  {name}
                </a>
                {index != Object.values(templateAuthors).length-1 ? ', ' : ''}
              </Fragment>
            ))}
          </Typography>
        </div>
      </div>
    </div>
  );
};
