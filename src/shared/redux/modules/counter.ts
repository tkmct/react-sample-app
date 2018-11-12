interface CounterState {
  count: number
}

function counter(
  state: CounterState = { count: 0 },
  action: { type: 'INCREMENT' | 'DECREMENT' }
): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

export default counter

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function fetchCounter(): Promise<number> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(getRandomInt(1, 100))
    }, 500)
  })
}
