import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import { loadableReady } from '@loadable/component';
import App, { Remote1Content } from '../src/components/App';
import path from 'path';

export default async (req, res, next) => {
  const helmet = Helmet.renderStatic();

  // await Remote1Content.load();

  res.setHeader('Content-type', 'text/html');
  res.write(`<!DOCTYPE html`);

  const statsFile = path.resolve('./dist/server/loadable-stats.json');
  const chunkExtractor = new ChunkExtractor({ statsFile, publicPath: '/static/' });
  const jsx = chunkExtractor.collectChunks(<App />);
  const styles = await chunkExtractor.getInlineStyleTags();

  res.write(`<html ${helmet.htmlAttributes.toString()}>
     <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <!-- This will include all the css chunks -->
      ${styles}
    </head>
    <body>`);
  res.write(`<div id="root">`);

  res.write(renderToString(jsx));
  res.write(`</div>`);
  res.write(`${chunkExtractor.getScriptTags()}`);
  res.end(`</body></html>`);

  // const stream = renderToNodeStream(jsx);

  // stream.pipe(res, { end: false })

  // stream.on('end', () => {
  //   res.write(`</div>`);
  //   res.write(
  //     `${chunkExtractor.getScriptTags()}`,
  //   );
  //   res.end(`</body></html>`);
  // });
};
