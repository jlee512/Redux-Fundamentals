
// Characteristics of a pure function
//  1) They always return the same result if the same arguments are passed in.
//  2) They depend only on the arguments passed into them
//  3) Never produce any side effects
// Pure functions, as a result, are incredibly predictable

// Reducer function
function todos(state = [], action) {
  // GENERALLY USE SWITCH/CASE STATEMENT INSTEAD OF IF/ELSEIF/ELSE
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id !== action.id ? todo :
      Object.assign({}, todo, {complete: !todo.complete}))
    default:
      return state
  }
}

function createStore(reducer) {
  // Four parts:
  //  1. The state
  //  2. A way to get the state
  //  3. A way to listen to the changes on the state
  //  4. Update the state
  //      An action is an object that describes a change in state that we want to make
  //        -> actions have a type as well as the properties defining the state change
  //      A reducer


  // let -> local to this function
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    // call todos which returns the new state
    state = reducer(state, action)
    // loop over all listeners and invoke them
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}


const store = createStore(todos)
// When store.subscribe() is called,
//   a function is passed as an input.
//   This tells the store what to do when the state is updated
//   We also return the unsubscribe function when subscribe is called!
const unsubscribe = store.subscribe(() => {
  console.log('The new state is: ', store.getState());
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
})
