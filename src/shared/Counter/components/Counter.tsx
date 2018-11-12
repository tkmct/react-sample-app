import * as React from 'react'
import { connect } from 'react-redux'

interface IProps {
  count: number
  increment: () => { type: string }
  decrement: () => { type: string }
}

class Counter extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <h1>COUNTER</h1>
        <p>{this.props.count}</p>
        <button onClick={this.props.increment}>INCREMENT</button>
        <button onClick={this.props.decrement}>DECREMENT</button>
      </div>
    )
  }
}

export default connect(
  (state: any) => ({
    count: state.counter.count
  }),
  {
    increment: () => ({ type: 'INCREMENT' }),
    decrement: () => ({ type: 'DECREMENT' })
  }
)(Counter)
