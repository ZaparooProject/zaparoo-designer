import { ButtonBase, ClickAwayListener } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import './LayersPanel.css';

type ColorSwatchProps = {
  color?: string;
  ariaLabel: string;
  onColorSelect?: (color: string) => void;
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
  color,
  ariaLabel,
  onColorSelect,
}: ColorSwatchProps) => {
  const isEmpty = isSwatchEmpty(color);
  const [open, setOpen] = useState(false);
  const initialColor = useMemo(() => normalizeToHex(color), [color]);
  const [pickerColor, setPickerColor] = useState(initialColor);

  useEffect(() => {
    setPickerColor(initialColor);
  }, [initialColor]);

  const onPickerChange = useCallback(
    (nextColor: string) => {
      setPickerColor(nextColor);
      onColorSelect?.(nextColor);
    },
    [onColorSelect],
  );

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="layer-swatch-wrapper">
        <div
          className={`layer-swatch${isEmpty ? ' is-empty' : ''}`}
          style={isEmpty ? undefined : { backgroundColor: color }}
        >
          <ButtonBase
            className="layer-swatch-button"
            onClick={() => setOpen((current) => !current)}
            aria-label={ariaLabel}
          />
        </div>
        {open && (
          <div className="layer-swatch-popover">
            <HexColorPicker color={pickerColor} onChange={onPickerChange} />
            <HexColorInput
              prefixed
              color={pickerColor}
              onChange={onPickerChange}
              className="layer-swatch-hex-input"
              aria-label={`${ariaLabel} hex input`}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
