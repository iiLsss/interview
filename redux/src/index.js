

const store = (initState = {}) => {
  let state = initState
  let listeners = []
  const subscribe = (fn) => {
    listeners.push(fn)
  }
  const getState = () => state
  const dispatch = (payload) => {
    state = {
      ...state,
      ...payload,
    }
    listeners.forEach(l => l())
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}

let {
  getState, 
  subscribe, 
  dispatch
} = store({name: 'diqiu', age: 18})

subscribe(() => {
  console.log(getState())
})

dispatch({age: 19})

setTimeout(() => {
  dispatch({age: 20})
}, 1000)
