// connect component to show single list
// holds all tasks
import _ from 'lodash'

// redux related
import { connect } from 'react-redux'

// import our actions
import {
  addTask,
  updateTask,
  deleteTask,

  updateList,
  deleteList
} from '../../actions/'

// import utils
import {
  alert
} from '../../utils/'

// import our presentation component to connect 
import ListView from '../presentation/ListView'

// helper function to extract tasks for this specific list
function _extractTasks(list_id, tasks) {
  return _.filter(tasks, (t) => t.list_id === list_id)
}

// define our mapStateToProps, mapDispatchToProps
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    tasks: _extractTasks(ownProps.id, state.tasks),
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskHandler: (task) => {
      dispatch( addTask({
        ...task
      }) )
      // task adding success
      // show notification
      alert({
        text: task.title + ' added successfully!'
      })
    },
    updateTaskHandler: (task) => {
      dispatch( updateTask(task) )
      // all fine show alert
      // show notification
      alert({
        text: task.title + ' updated ...'
      })
    },
    deleteTaskHandler: (id) => {
      dispatch( deleteTask(id) )
      // all fine show alert
      // show notification
      alert({
        text: 'Task deleted ...',
        timeout: 750
      })
    },

    // update list (only title)
    updateListHandler: (list) => {
      // return
      dispatch( updateList(list) )
      // no alert as it will be dynamically updated on keypress
    },

    // delete list
    deleteListHandler: (id) => {
      dispatch( deleteList(id) )
      // all fine show alert
      // show notification
      alert({
        text: 'List deleted ...',
        timeout: 750
      })
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)