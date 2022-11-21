export function generateRandomId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const t = (16 * Math.random()) | 0;
    return ('x' == char ? t : (3 & t) | 8).toString(16);
  });
}
