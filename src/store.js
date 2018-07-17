/*
STORE: Single state tree

Benefits:
  Shared cache
  Predictable state changes
  Improved dev tooling
  Pure functions
  Server rendering

Methods:
1. Get state from state tree
2. Listen for changes to the state tree
3. Update the state tree

The store has four parts:
1. The state (not public)
2. Get the state (these 3 are public)
3. Listen to changes on the state
4. Update the state
*/

{
  type: ‘ADD_TODO’,
  todo: {

    id: 0,

    name: ‘Learn Redux’,

    complete: false,

  }
}

{
  type: ‘REMOVE_TODO’,
  id: 0,
}

{
  type: ‘TOGGLE_TODO’,
  id: 0
}

{
  type: ‘ADD_GOAL’,
  goal: {
    id: 0,
    name: ‘Run a Marathon’
  }
}

{
  type: ‘REMOVE_GOAL’,
  id: 0
}



function createStore() {
let state;
let listeners = []
const getState = () => state;
const subscribe = (listener) => {
  listeners.push(listener)
  return () {
    listeners = listeners.filter((l) => l !== listener)
  }
}

return {
  getState,
  subscribe
}}

const store = createStore();

store.subscribe(() => {

})
