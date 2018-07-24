// Step 1
// Dispatch an action
// addTodoAction() portion of the dispatch,
// i.e., store.dispatch(addTodoAction({
// We start with this object:
{
  id: 0,
  name: 'Walk the dog',
  complete: false,
}

// Step 2
// addTodoAction
// It returns this object:
todo: {
  id: 0,
  name: 'Walk the dog',
  complete: false,
}
type: 'ADD_TODO'  // <<--- THIS is why they have to be strings!


// Steps 3, 4, 5
// const dispatch = (action) =>
// The dispatch portion of:
// store.dispatch(addTodoAction({
// So, dispatch is receiving everything
// returned in step 2 above.
// it returns this:
state: {
  goals: [],
  todos: 0: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
}
action: {
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
  type: 'ADD_TODO'
}
