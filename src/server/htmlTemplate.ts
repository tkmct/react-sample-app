export default function htmlTemplate(assets: string[], preloadedState: any) {
  const headHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React SSR</title>
  </head>
  <body>
    <div id="app">`
  const tailHTML = `</div>
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
    </script>
    ${assets.map(src => `<script src="${src}"></script>`).join('\n')}
  </body>
</html>`
  return [headHTML, tailHTML]
}
