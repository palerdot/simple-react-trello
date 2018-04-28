// home component that handles all the boards
// redux related
import { connect } from 'react-redux'

import {
  addBoard,
  updateBoard,
  deleteBoard,
} from '../../actions/'

// import utils
import {
  alert
} from '../../utils/'

// import our presentation component to connect 
import HomeView from '../presentation/HomeView'

// define our mapStateToProps, mapDispatchToProps
const mapStateToProps = (state) => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBoardHandler: (title) => {
      let board = {
        title
      }
      dispatch( addBoard(board) )
      // show alert
      alert({
        text: title + ' added ...'
      })
    },
    updateBoardHandler: (board) => {
      dispatch( updateBoard(board) )
      // show alert
      alert({
        text: board.title + ' updated ...'
      })
    },
    deleteBoardHandler: (id) => {
      dispatch( deleteBoard(id) )
      // show alert
      alert({
        text: 'Board deleted ...'
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)

