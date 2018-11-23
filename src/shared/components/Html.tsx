import * as React from 'react'

const Html = (props: {
  src: string
  preloadedState: any
  children: React.ReactNode
}) => (
  <html>
    <head>
      <title>React SSR</title>
      <link rel="icon" href="/favicon.ico" />
      <script
        id="preloaded-state"
        data-json={JSON.stringify(props.preloadedState)}
        defer
      />
      <script src={props.src} defer />
    </head>
    <body>
      <div id="app">{props.children}</div>
    </body>
  </html>
)

export default Html
