import { staticLogos } from './logos';

export const logoStyles = [
  staticLogos
    .filter((logo) => logo.style === 'Dark - Color')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Light - Color')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Thick Outlines')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Thin Outlines')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Dark - Black & White')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Dark - Just Black')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Light - Black & White')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'Light - Just White')
    .sort((a: any, b: any) => a.category - b.category),
  staticLogos
    .filter((logo) => logo.style === 'mixed')
    .sort((a: any, b: any) => a.category - b.category),
] as const;
