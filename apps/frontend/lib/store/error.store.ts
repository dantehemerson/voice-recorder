import { Optional } from '@voice-recorder/shared-types';
import { atom } from 'jotai';

export type ErrorStore = {
  message: string;
  details: string;
};

export const errorStoreAtom = atom<Optional<ErrorStore>>(undefined);
