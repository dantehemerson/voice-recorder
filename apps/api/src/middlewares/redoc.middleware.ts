import { redocHtml, RedocOptions } from './helpers/redoc-html-template';

export function redocMiddleware(options: RedocOptions): any {
  return function middleware(_req: any, res: any): void {
    res.type('html');
    res.send(redocHtml(options));
  };
}
