/*
I'm using the comment space of this document to track one state update.

The is the action being used for the example:

STEP 1: Dispatch some data to add to state
store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))

This is really three functions mashed together. The first function to
resolve is the addTodoAction() function.  To track this example, skip down to 'STEP 2:' below.
----------------------------------------------------------------------
*** >>  Moving on to STEP 3:

Now it will run the second function: dispatch([the data we just returned])
[The data returned from Step 2 was the type of action, and the todo object.]

Continue tracking by skipping down to Step 3.
----------------------------------------------------------------------

**** >> Moving on to STEP 7:
Now for the third part of the original dispatch function:
the 'store' portion of store.dispatch(addTodoAction({
This instantiates the store:
const store = createStore(app)
Skip down to STEP 7 below.
----------------------------------------------------------------------
*/

// Library code
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state. (getState)
  // 3. Listen to changes on the state. (subscribe)
  // 4. Update the state (dispatch)

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

//
// STEP 3:
// Here, 'action' is  passed as one object and state as one object.
// They are, magically, referred to with one word, 'action':
//
  const dispatch = (action) => {
    state = reducer(state, action)      ////// STEP 4, go to STEP 5
    /* console.log('reducer returns: ')
      console.log(state)
      console.log(action)*/
    listeners.forEach((listener) => listener())
  }
  // STEP 6
  // Now go back to the top ^, look for the ****
  return {
    getState,
    subscribe,
    dispatch,
  }
}

// App Code
const ADD_TODO = 'ADD_TODO' // Must be a string, and it's easier to not have to deal with more apostrophes. Just for convenience.
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

//
// STEP 2:
//
// This is the addTodoAction(), which is being passed the 'todo' object
// The addTodoAction() is now done because it has run and returned something.
// It has returned the original 'todo', plus told us the type of action is ADD_TODO.
// Now it will move to the next function in the original dispatch, passing those two objects.
// Back to the top of this page ^ , Look for the ***
function addTodoAction (todo) {
    /*console.log('---- addTodoAction ----')
    console.log('todo: ', todo)*/
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

//
// STEP 11
// Reducer function
function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO :        // < ----- And finally the 'ADD_TODO' action runs
      return(
        state.concat([action.todo])  // <-- and adds the todo to the state.
      )
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete})
      )
    default :
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

// STEP 9
function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),  // <-- STEP 10, go to STEP 11
    goals: goals(state.goals, action)
  }
}

//
// STEP 7:
// Instantiating the store and passing it
// ALL the information we've been mutating
const store = createStore(app) // <-- STEP 8, go to STEP 9

//
// STEP 12:
// Now we can use the store to access its unique properties:

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

// [Step 1. Dispatch an action]
store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))
