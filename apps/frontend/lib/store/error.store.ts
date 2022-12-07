import { Optional } from '@voice-recorder/shared-types';
import { atom } from 'jotai';
import { ErrorStore } from './types/error-store.type';

export const errorStoreAtom = atom<Optional<ErrorStore>>(undefined);
