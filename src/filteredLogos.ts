const getStaticLogosDarkBlackWhite = () =>
  import('./assets/logos/logos-DarkBlackWhite').then(
    (mod) => mod.staticLogosDarkBlackWhite,
  );
const getStaticLogosDarkColor = () =>
  import('./assets/logos/logos-DarkColor').then(
    (mod) => mod.staticLogosDarkColor,
  );
const getStaticLogosDarkJustBlack = () =>
  import('./assets/logos/logos-DarkJustBlack').then(
    (mod) => mod.staticLogosDarkJustBlack,
  );
const getStaticLogosLightBlackWhite = () =>
  import('./assets/logos/logos-LightBlackWhite').then(
    (mod) => mod.staticLogosLightBlackWhite,
  );
const getStaticLogosLightColor = () =>
  import('./assets/logos/logos-LightColor').then(
    (mod) => mod.staticLogosLightColor,
  );
const getStaticLogosLightJustWhite = () =>
  import('./assets/logos/logos-LightJustWhite').then(
    (mod) => mod.staticLogosLightJustWhite,
  );
const getStaticLogosThickOutlines = () =>
  import('./assets/logos/logos-ThickOutlines').then(
    (mod) => mod.staticLogosThickOutlines,
  );
const getStaticLogosThinOutlines = () =>
  import('./assets/logos/logos-ThinOutlines').then(
    (mod) => mod.staticLogosThinOutlines,
  );

export const logoStyles = [
  {
    getter: getStaticLogosDarkColor,
    style: 'Dark - Color',
  },
  {
    getter: getStaticLogosLightColor,
    style: 'Light - Color',
  },
  {
    getter: getStaticLogosDarkBlackWhite,
    style: 'Dark - Black & White',
  },
  {
    getter: getStaticLogosLightBlackWhite,
    style: 'Light - Black & White',
  },
  {
    getter: getStaticLogosDarkJustBlack,
    style: 'Dark - Just Black',
  },
  {
    getter: getStaticLogosLightJustWhite,
    style: 'Light - Just White',
  },
  {
    getter: getStaticLogosThickOutlines,
    style: 'Thick Outlines',
  },
  {
    getter: getStaticLogosThinOutlines,
    style: 'Thin Outlines',
  },
] as const;
