import { AbortRequestError } from '../errors/abort-request.error';
import { AbortablePromise } from '../interfaces/abortable-promise.interface';
import { RetryableFetchInitOptions } from '../interfaces/retryable-fetch-init-options.interface';

export function retryableFetch<T = any>(
  input: RequestInfo | URL,
  init: RetryableFetchInitOptions
): AbortablePromise<T> {
  let aborted = false;
  let abort!: () => void;

  const { parseJson, resolveWhenNotOk } = init;

  const promise = new AbortablePromise((resolve, reject) => {
    const u = cancellableRetryTimeout(
      retryMethod => {
        fetch(input, init)
          .then(response => {
            if (!aborted) {
              if (response.ok || resolveWhenNotOk) {
                if (parseJson) {
                  response
                    .json()
                    .then(json => {
                      resolve(json);
                    })
                    .catch(error => {
                      console.log('Error parsing json', error);

                      retryMethod();
                    });
                } else {
                  resolve(response);
                }
              } else {
                retryMethod();
              }
            }
          })
          .catch(error => {
            console.error(`Error on fetching ${input}`, error);

            if (!aborted) {
              retryMethod();
            }
          });
      },
      [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
    );

    abort = () => {
      aborted = true;
      u.cancel();
      reject(new AbortRequestError('Request aborted'));
    };
  }) as AbortablePromise;

  promise.abort = abort;

  return promise;
}

/**
 * Function to retry a function with a timeout
 *
 * @param callback  - callback to be called after each timeout
 * @param timeouts  Array of timeouts in milliseconds
 * @param delayedExecution Indicates if the first execution should be delayed
 * @returns Function to cancel the execution
 */
function cancellableRetryTimeout(
  callback,
  timeouts: number[],
  delayedExecution?: boolean
) {
  let canceled = false;

  const retryMethod = () => {
    if (!canceled) {
      if (timeouts.length > 0) {
        const timeout = timeouts.shift();

        setTimeout(() => {
          if (!canceled) {
            callback(retryMethod);
          }
        }, timeout);
      }
    }
  };

  delayedExecution ? retryMethod() : callback(retryMethod);

  return {
    cancel: () => {
      canceled = true;
    },
  };
}
