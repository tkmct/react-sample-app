import * as React from 'react'

export default class App extends React.Component {
  public clickButton = () => {
    console.info('Hello, my name is App')
  }

  public render() {
    return (
      <div>
        <h1>React SSR Sample</h1>
        <p>HMR is working fine!!</p>
        <button onClick={this.clickButton}>Hi!</button>
      </div>
    )
  }
}
