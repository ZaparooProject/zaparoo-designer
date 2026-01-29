import { useFileDropperContext } from '../contexts/fileDropper';
import './Header.css';
import { Suspense, useCallback, useState, memo } from 'react';
import logoUrl from '../img/zaparoo.png';
import { Button } from '../components/ResponsiveIconButton';
import { Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import PrintModal from '../components/PrintModal';

export const Header = memo(() => {
  const { cards } = useFileDropperContext();
  const [printOpen, setPrintOpen] = useState(false);

  const closePrintModal = useCallback(() => {
    setPrintOpen(false);
  }, []);

  const openPrintModal = useCallback(() => {
    setPrintOpen(true);
  }, []);

  const hasFiles = !!cards.current.length;

  return (
    <>
      <div className={`${hasFiles ? 'fullHeader' : 'emptyHeader'} topHeader`}>
        <div className="spacedContent">
          <div className="content" style={{ columnGap: 10 }}>
            <img id="logo" src={logoUrl} />
          </div>
        </div>
        {hasFiles && (
          <>
            <div className="spacedContent">
              <div className="content"></div>
              <div className="content">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={openPrintModal}
                >
                  <PrintIcon />
                  <Typography>&nbsp;Print</Typography>
                </Button>
              </div>
            </div>
          </>
        )}
        <Suspense>
          {printOpen && (
            <PrintModal onClose={closePrintModal} open={printOpen} />
          )}
        </Suspense>
      </div>
    </>
  );
});
