export default function htmlTemplate(assets: string[]) {
  return [
    `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">`,
    `</div>
          ${assets.map(src => `<script src="${src}"></script>`).join('\n')}
      </body>
      </html>
  `
  ]
}
