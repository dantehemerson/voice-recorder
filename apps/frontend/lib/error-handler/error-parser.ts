import { ErrorStore } from '@features/HomePage/Error.component';

export function errorParser(error: Error): ErrorStore {
  if (error instanceof Error) {
    if (error.name === 'NotAllowedError') {
      return {
        message: 'Permission Denied',
        details: 'You need to allow microphone access to record audio.',
      };
    }
  }

  return {
    message: error?.name || 'Error',
    details: error?.message || 'An unknown error occurred',
  };
}
