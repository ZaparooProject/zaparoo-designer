import { SvgIcon, type SvgIconProps } from '@mui/material';

export const IgdbSourceIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M3 4.25A1.25 1.25 0 0 1 4.25 3h15.5A1.25 1.25 0 0 1 21 4.25v15.5A1.25 1.25 0 0 1 19.75 21H4.25A1.25 1.25 0 0 1 3 19.75V4.25Zm2.5 1.25v12.72a48.24 48.24 0 0 1 13 0V5.5h-13Zm1.72 2.3h1.94v1.33H7.22V7.8Zm.32 1.88h1.3v5.4h-1.3v-5.4Zm-.32 5.95h1.94v1.34H7.22v-1.34Zm7.82-7.88c1.2 0 2.26.36 3.09 1.03l-1 1.04a3.1 3.1 0 0 0-1.93-.6c-1.5 0-2.66 1.07-2.66 2.86 0 1.78 1.08 2.88 2.57 2.88.55 0 1.02-.14 1.39-.38v-1.18h-1.67v-1.34h3.04v3.28c-.83.72-1.9 1.1-3.03 1.1-2.37 0-4.18-1.62-4.18-4.32 0-2.61 1.91-4.37 4.38-4.37Z"
      clipRule="evenodd"
    />
  </SvgIcon>
);

export const SteamGridDbSourceIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <rect x="4" y="5" width="12.5" height="8.5" rx="1" fill="currentColor" opacity="0.4" />
    <rect x="6.5" y="7" width="12.5" height="8.5" rx="1" fill="currentColor" opacity="0.7" />
    <rect x="9" y="9" width="11" height="8" rx="1" fill="currentColor" />
  </SvgIcon>
);
