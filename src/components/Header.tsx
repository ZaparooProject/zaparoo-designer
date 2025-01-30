import { useFileDropperContext } from '../contexts/fileDropper';
import './Header.css';
import {
  Suspense,
  lazy,
  useCallback,
  useState,
  useTransition,
  memo,
} from 'react';
import logoUrl from '../img/zaparoo.png';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from './ResponsiveIconButton';
import Typography from '@mui/material/Typography';
import { useFileAdder } from '../hooks/useFileAdder';
import PrintIcon from '@mui/icons-material/Print';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const ImageSearch = lazy(() => import('./ImageSearch'));
const PrintModal = lazy(() => import('./PrintModal'));
const PurpleHeader = lazy(() => import('./PurpleHeader'));

export const Header = memo(() => {
  const { cards, setSelectedCardsCount } = useFileDropperContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  const { inputElement, openInputFile } = useFileAdder();
  const [, startTransition] = useTransition();

  const closePrintModal = useCallback(() => {
    setPrintOpen(false);
  }, []);

  const openPrintModal = useCallback(() => {
    setPrintOpen(true);
  }, []);

  const selectAll = useCallback(() => {
    cards.current.forEach((card) => {
      card.isSelected = true;
    });
    setSelectedCardsCount(cards.current.length);
  }, [cards, setSelectedCardsCount]);

  const hasFiles = !!cards.current.length;

  return (
    <>
      <div className={`${hasFiles ? 'fullHeader' : 'emptyHeader'} topHeader`}>
        <Suspense>
          {searchOpen && (
            <ImageSearch open={searchOpen} setOpen={setSearchOpen} />
          )}
        </Suspense>
        {inputElement}
        <div className="spacedContent">
          <div className="content" style={{ columnGap: 10 }}>
            <img id="logo" src={logoUrl} />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={openInputFile}
            >
              <AddCircleOutlineIcon />
              <Typography>&nbsp;Add files</Typography>
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => startTransition(() => setSearchOpen(true))}
            >
              <SearchIcon />
              <Typography>&nbsp;Search image</Typography>
            </Button>
          </div>
          {hasFiles && (
            <div className="content">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={selectAll}
              >
                <CheckBoxIcon />
                <Typography>&nbsp;Select all</Typography>
              </Button>
            </div>
          )}
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
      {hasFiles && <PurpleHeader />}
    </>
  );
});
