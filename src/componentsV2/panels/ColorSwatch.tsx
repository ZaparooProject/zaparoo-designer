import './LayersPanel.css';

type ColorSwatchProps = {
  color?: string;
  ariaLabel: string;
};

const isSwatchEmpty = (value?: string) => !value || value === 'transparent';

export const ColorSwatch = ({ color, ariaLabel }: ColorSwatchProps) => {
  const isEmpty = isSwatchEmpty(color);

  return (
    <div
      className={`layer-swatch${isEmpty ? ' is-empty' : ''}`}
      style={isEmpty ? undefined : { backgroundColor: color }}
      aria-label={ariaLabel}
    />
  );
};
