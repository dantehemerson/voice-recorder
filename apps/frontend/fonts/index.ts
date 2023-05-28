import { Chivo } from '@next/font/google';
import localFont from '@next/font/local';

export const MonoFont = Chivo({ subsets: ['latin'], weight: ['800'] });
export const NexaFont = localFont({
  src: [{ path: './Nexa Bold.otf', weight: 'normal' }],
});
