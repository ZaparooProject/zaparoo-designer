import {
  memo,
  lazy,
  useState,
  Suspense,
  type ReactNode,
  useCallback,
  forwardRef,
  type ForwardedRef,
} from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import './ColorButton.css';

const CompactColor = lazy(() => import('@uiw/react-color-compact'));

type ColorButtonsProps = {
  onClick: (color: string) => void;
  color: string;
};

type ColorSwatchProps = {
  color: string;
  children?: ReactNode;
  className?: string;
  onClick: () => void;
};

const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
  (
    { children, onClick, color, className = 'colorButton' }: ColorSwatchProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div ref={ref} className={className} style={{ backgroundColor: color }}>
      <ButtonBase
        onClick={() => onClick()}
        style={{ width: '100%', height: '100%' }}
      />
      {children}
    </div>
  ),
);

export const ColorButtons = memo(({ color, onClick }: ColorButtonsProps) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <ClickAwayListener onClickAway={close}>
      <ColorSwatch onClick={() => setOpen(true)} color={color}>
        <Suspense fallback={null}>
          {open && (
            <CompactColor
              color={color}
              onChange={(color) => onClick(color.hex)}
              style={{
                width: '296px',
                zIndex: 20,
                border: '1px solid grey',
                position: 'relative',
                backgroundColor: 'white',
                marginTop: '10px',
                paddingLeft: '8px',
                paddingTop: '8px',
              }}
              rectRender={({ color }) => (
                <ColorSwatch
                  color={color}
                  onClick={() => {
                    onClick(color);
                    close();
                  }}
                  className="smallSwatch"
                />
              )}
            />
          )}
        </Suspense>
      </ColorSwatch>
    </ClickAwayListener>
  );
});
