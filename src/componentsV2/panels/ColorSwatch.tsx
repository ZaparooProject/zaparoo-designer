import { Button, ButtonBase, ClickAwayListener } from '@mui/material';
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useMemo,
} from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import './LayersPanel.css';

type ColorSwatchProps = {
  id: string;
  color?: string;
  ariaLabel: string;
  property: 'fill' | 'stroke';
  isOpen: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  onColorSelect: (
    id: string,
    nextColor: string,
    property: 'fill' | 'stroke',
  ) => void;
};

const isSwatchEmpty = (value?: string) => !value || value === 'transparent';

const isHex = (value: string) =>
  /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());

const rgbToHex = (value: string) => {
  const rgbMatch = value.match(
    /^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})/i,
  );
  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch.slice(1, 4).map((n) => Number.parseInt(n, 10));
  const valid = channels.every((n) => Number.isFinite(n) && n >= 0 && n <= 255);
  if (!valid) {
    return null;
  }

  return `#${channels.map((n) => n.toString(16).padStart(2, '0')).join('')}`;
};

const normalizeToHex = (value?: string) => {
  if (!value || value === 'transparent') {
    return '#ffffff';
  }

  const trimmed = value.trim().toLowerCase();
  if (isHex(trimmed)) {
    if (trimmed.length === 4) {
      const [r, g, b] = trimmed.slice(1).split('');
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return trimmed;
  }

  const rgbHex = rgbToHex(trimmed);
  return rgbHex ?? '#ffffff';
};

export const ColorSwatch = ({
  id,
  color,
  ariaLabel,
  isOpen,
  onOpenChange,
  onColorSelect,
  property,
}: ColorSwatchProps) => {
  const isEmpty = isSwatchEmpty(color);
  const pickerColor = useMemo(() => normalizeToHex(color), [color]);

  const setOpenClick = useCallback(() => {
    onOpenChange(!isOpen);
  }, [isOpen, onOpenChange]);

  const onPickerChange = useCallback(
    (nextColor: string) => {
      onColorSelect(id, nextColor, property);
    },
    [id, onColorSelect, property],
  );

  const setTransparent = useCallback(() => {
    onColorSelect(id, 'transparent', property);
    onOpenChange(false);
  }, [id, onColorSelect, onOpenChange, property]);

  const closePopover = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const stopPopoverClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  const onHexInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        closePopover();
      }
    },
    [closePopover],
  );

  const transparentLabel = `Set ${ariaLabel.toLowerCase()} to transparent`;

  const transparentButtonLabel = property === 'fill' ? 'No fill' : 'No stroke';

  const transparentButtonTitle =
    property === 'fill'
      ? 'Set fill to transparent'
      : 'Set stroke to transparent';

  const pickerInputLabel = `${ariaLabel} hex input`;

  const buttonAriaLabel = ariaLabel;
  const swatchStyle = isEmpty ? undefined : { backgroundColor: color };

  const swatchClassName = `layer-swatch${isEmpty ? ' is-empty' : ''}`;

  return (
    <ClickAwayListener onClickAway={closePopover}>
      <div className="layer-swatch-wrapper">
        <div className={swatchClassName} style={swatchStyle}>
          <ButtonBase
            className="layer-swatch-button"
            onClick={setOpenClick}
            aria-label={buttonAriaLabel}
          />
        </div>
        {isOpen && (
          <div className="layer-swatch-popover" onClick={stopPopoverClick}>
            <HexColorPicker color={pickerColor} onChange={onPickerChange} />
            <HexColorInput
              prefixed
              color={pickerColor}
              onChange={onPickerChange}
              onKeyDown={onHexInputKeyDown}
              className="layer-swatch-hex-input"
              aria-label={pickerInputLabel}
            />
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={setTransparent}
              aria-label={transparentLabel}
              title={transparentButtonTitle}
              className="layer-swatch-transparent-button"
            >
              {transparentButtonLabel}
            </Button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
