// define our actions

// board related actions
export const addBoard = (board) => {
  return {
    type: 'ADD_BOARD',
    board
  }
}

// update board
export const updateBoard = (board) => {
  return {
    type: 'UPDATE_BOARD',
    board
  }
}

// delete board
export const deleteBoard = (id) => {
  return {
    type: 'DELETE_BOARD',
    id
  }
}

// list related actions
export const addList = (list) => {
  return {
    type: 'ADD_LIST',
    list
  }
}

// update list with new title
export const updateList = (list) => {
  return {
    type: 'UPDATE_LIST',
    list
  }
}

export const deleteList = (id) => {
  return {
    type: 'DELETE_LIST',
    id
  }
}

// task related actions

export const addTask = (task) => {
	return {
    type: 'ADD_TASK',
    task
  }
}

// update task (details will be the whole task with id)
export const updateTask = (task) => {
  return {
    type: 'UPDATE_TASK',
    task
  }
}

export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    id
  }
}

export const changeMessage = (message) => {
  return {
    type: "CHANGE_MESSAGE",
    message: message
  }
}