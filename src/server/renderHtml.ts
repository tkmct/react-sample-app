import * as React from 'react'

export default function htmlTemplate(
  reactDom: React.ReactNode,
  assets: string[]
) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${reactDom}</div>
          ${assets.map(src => `<script src="${src}"></script>`).join('\n')}
      </body>
      </html>
  `
}
