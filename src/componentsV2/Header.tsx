import { useFileDropperContext } from '../contexts/fileDropper';
import './Header.css';
import { Suspense, useCallback, useState, memo } from 'react';
import logoUrl from '../img/zaparoo.png';
import { Button } from './ResponsiveIconButton';
import { Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import PrintModal from './PrintModal';

export const Header = memo(() => {
  const { cards, saveSession, loadSession } = useFileDropperContext();
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
        <div className="spacedContent">
          <div className="content" style={{ columnGap: 8 }}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={loadSession}
            >
              <FileOpenIcon />
              <Typography>&nbsp;Load</Typography>
            </Button>
            {hasFiles && (
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={saveSession}
              >
                <SaveIcon />
                <Typography>&nbsp;Save</Typography>
              </Button>
            )}
          </div>
          <div className="content">
            {hasFiles && (
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={openPrintModal}
              >
                <PrintIcon />
                <Typography>&nbsp;Print</Typography>
              </Button>
            )}
          </div>
        </div>
        <Suspense>
          {printOpen && (
            <PrintModal onClose={closePrintModal} open={printOpen} />
          )}
        </Suspense>
      </div>
    </>
  );
});
