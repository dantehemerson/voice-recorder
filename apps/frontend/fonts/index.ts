import { Chivo } from '@next/font/google';
import localFont from '@next/font/local';

export const MonoFont = Chivo({ subsets: ['latin'] });
export const NexaFont = localFont({
  src: [
    // { path: './Nexa-Light.otf', weight: '300' },
    { path: './Nexa-Bold.otf', weight: 'normal' },
  ],
});
