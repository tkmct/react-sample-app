import * as React from 'react'

export default class App extends React.Component {
  public clickButton = () => {
    console.info('Hello, my name is App')
  }

  public render() {
    return (
      <div>
        <h1>React SSR Sample</h1>
        <p>Hi, How are you??</p>
        <button onClick={this.clickButton}>Hi!</button>
      </div>
    )
  }
}
