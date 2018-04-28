// define the reducers that changes the state tree based on the dispatched actions
import _ from 'lodash'

// reducer for the trello app
// START: APP STATE
/*
{
  boards: [],
  lists: [
    {
      id: '',
      title: ''
    }
  ],
  tasks: [
    {
      id: '',
      title: '',
      description: '',
      list_id: ''
    }
  ]
}
*/
// END: APP STATE

// define our initial state
const initialState = {
  boards: [
    {
      id: 1,
      title: "Default Board",
      default: true
    }
  ],
  lists: [
    {
      id: 1,
      title: "Backlog",
      board_id: 1
    },
    {
      id: 2,
      title: "Priority",
      board_id: 1
    }
  ],
  tasks: []
}

// small helper function to get unique board id by scanning through the entries
function _getUniqueId(collection) {
  let MAX_ID = _.chain(collection)
              .map((c) => c.id)
              .max()
              .value()
  MAX_ID = MAX_ID || 0

  return MAX_ID + 1
}

// reducer for board
function boardReducer(state = initialState.boards, action) {
  switch (action.type) {
    // adds list
    case 'ADD_BOARD':
      let board = Object.assign({}, action.board, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        board
      ]

    case 'UPDATE_BOARD':
      // loop through our boards; if id matches update the board; else return the old board
      return state.map((b) => b.id === action.board.id ? action.board : b)

    case 'DELETE_BOARD':
      // delete board with given id
      return state.filter((b) => b.id !== action.id)

    default:
      return state
  }
}

// lists reducer
function listReducer(state = initialState.lists, action) {
  switch (action.type) {
    // adds list
    case 'ADD_LIST':
      let list = Object.assign({}, action.list, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        list
      ]

    case 'UPDATE_LIST':
      // loop through our lists; if id matches update the list; else return the old list
      let updated = state.map((l) => l.id === action.list.id ? action.list : l)
      return updated

    case 'DELETE_LIST':
      // delete list with given id
      return state.filter((l) => l.id !== action.id)

    default:
      return state
  }
}

// tasks reducer
function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    // adds list
    case 'ADD_TASK':
      let task = Object.assign({}, action.task, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        task
      ]

    case 'UPDATE_TASK':
      // loop through our tasks; if id matches update the task; else return the old task
      return state.map((t) => t.id === action.task.id ? action.task : t)

    case 'DELETE_TASK':
      // delete task with given id
      return state.filter((t) => t.id !== action.id)

    default:
      return state
  }
}

// OVERALL REDUCER (to be exported)
// we are explicitly not using combineReducers to have better visibility of what is going on
export default function appReducer(state = initialState, action)  {  
  return {
    boards: boardReducer(state.boards, action),
    lists: listReducer(state.lists, action),
    tasks: taskReducer(state.tasks, action)
  }
}
