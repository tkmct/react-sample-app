import * as React from 'react'

export default class App extends React.Component {
  public clickButton = () => {
    console.info('hello click button')
  }

  public render() {
    return (
      <div>
        <h1>React SSR Sample</h1>
        <button onClick={this.clickButton}>Hi!</button>
      </div>
    )
  }
}
