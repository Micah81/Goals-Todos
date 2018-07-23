


// We start with this object:

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))


// It returns this object:
// Verify this ... 
store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
  type: 'ADD_TODO'
}))
