import * as React from 'react'

const Html = (props: {
  src: string
  preloadedState: any
  children: React.ReactNode
}) => (
  <html>
    <head>
      <title>React SSR</title>
    </head>
    <body>
      <div id="app">{props.children}</div>
      <script
        id="preloaded-state"
        data-json={JSON.stringify(props.preloadedState)}
      />
      <script src={props.src} />
    </body>
  </html>
)

export default Html
