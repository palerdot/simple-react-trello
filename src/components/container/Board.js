// connect component that manages the main board
// holds all the lists
import _ from 'lodash'

// redux related
import { connect } from 'react-redux'

import {
  addList,
} from '../../actions/'

// import utils
import {
  alert
} from '../../utils/'

// import our presentation component to connect 
import BoardView from '../presentation/BoardView'


// helper function to extract lists for this specific board
function _extractLists(board_id, lists) {
  return _.filter(lists, (l) => l.board_id === board_id)
}

// define our mapStateToProps, mapDispatchToProps
const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    lists: _extractLists(ownProps.id, state.lists)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addListHandler: (title) => {
      let list = {
        title,
        board_id: ownProps.id
      }
      dispatch( addList(list) )
      // show alert
      alert({
        text: title + ' added ...'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView)