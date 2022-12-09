import { atom } from 'jotai';

export type ErrorStore = {
  message: string;
  details: string;
};

export const errorStoreAtom = atom(undefined as ErrorStore);
