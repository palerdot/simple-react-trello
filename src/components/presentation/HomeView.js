// main home view
import React from 'react'

import _ from 'lodash'

import {
  Alert,
  Input, Button,
  Container, Row, Col,
  Form, FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap'

// import utils
import {
  alert,
  boardTitleValidator
} from '../../utils/'

// import Board
import Board from '../container/Board'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    // set the state
    this.state = {
      modal: false,
      current_board: 1
    }
    // proxy toggle to toggle modal
    this.toggle = this._toggleModal.bind(this)
  }

  // helper to get the current selected board info
  _getCurrentBoard() {
    return _.find(this.props.boards, (b) => b.id === this.state.current_board)
  }

  // helper function to find out if current board default
  _isDefaultBoard() {
    return this._getCurrentBoard() && this._getCurrentBoard().default
  }

  // helper function to toggle modal
  _toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  _addBoard = () => {
    let title = this.newBoardTitleDOM.value.trim()
    let { success, message } = boardTitleValidator(title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      // do not proceed
      return
    }
    this.props.addBoardHandler(title)
    // close the modal
    this.setState({
      modal: false
    })
  }

  // helper function to update board title
  _updateBoardTitle = () => {
    let title = this.currentBoardTitleDOM.value.trim()
    let { success, message } = boardTitleValidator(title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      // do not proceed
      return
    }
    let current_board = this._getCurrentBoard()
    if (!current_board) {
      return
    }
    let board = Object.assign({}, current_board, {
      title
    })
    this.props.updateBoardHandler(board)
    // close the modal
    this.setState({
      modal: false
    })
  }

  // helper function to delete board
  _deleteBoard = () => {
    this.props.deleteBoardHandler(this.state.current_board)
    // we need to switch to the default board
    let default_board = _.find(this.props.boards, (b) => b.default)
    // close the modal
    this.setState({
      current_board: default_board.id,
      modal: false
    })

    return false 
  }

  render() {
    return (
      <div className="App-Container">
        <Container fluid>
          <Row>
            <Col sm="6">
              <Form>
                <FormGroup row>
                  <Col sm="8">
                    <Input type="select" name="boardList" id="boardList" value={this.state.current_board}
                      onChange={(e) => this.setState({
                        current_board: parseInt(e.target.value, 10)
                      })}
                    >
                      {
                        this.props.boards.map((b) => (
                          <option key={b.id} value={b.id}>{b.title}</option>
                        ))
                      }
                    </Input>
                  </Col>
                  <Col sm="4">
                    <Button color="" style={{}}
                      onClick={this.toggle}
                    >
                      <span className="oi" data-glyph="cog" title="delete List" aria-hidden="true"></span>{' '}
                    </Button>{' '}
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        {/* CURRENT BOARD */}
        <Board id={this.state.current_board} />
        {/* Modal to edit Board properties */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Manage Board</ModalHeader>
          <ModalBody>
            <div className="label-title">Manage Current Board</div>
            <Form>
              <FormGroup row>
                <Col sm={8}>
                  <Input type="text" name="currentBoardTitle" id="currentBoardTitle" 
                    defaultValue={this._getCurrentBoard().title} 
                    placeholder="Update current board ..."
                    innerRef={(ref) => this.currentBoardTitleDOM = ref} 
                  />
                </Col>
                <Col sm={4}>
                  <Button color="primary"
                    onClick={this._updateBoardTitle}
                  >Update Title</Button>
                </Col>
              </FormGroup>
              <FormGroup style={{justifyContent: 'center', textAlign: 'center'}}>
                <Button color="danger" disabled={this._isDefaultBoard()}
                  onClick={this._deleteBoard}
                >Delete Board</Button>
                {
                  this._isDefaultBoard()
                  ? (
                    <Alert color="light">
                      This is the default board. This board cannot be deleted
                    </Alert>
                  )
                  : null
                }  
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter style={{display: 'block', justifyContent: 'center'}}>
            <div className="label-title">Create New Board</div>
            <div>
              <Form>
                <FormGroup row>
                  {/*<Label for="newBoardTitle" className="mr-sm-2">Add New Board:</Label>*/}
                  <Col sm={8}>
                    <Input type="text" name="newBoardTitle" id="newBoardTitle" placeholder="Enter new board name ..." 
                      innerRef={(ref) => this.newBoardTitleDOM = ref} 
                    />
                  </Col>
                  <Col sm={4}>
                    <Button color="success" onClick={this._addBoard}>Create Board</Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </ModalFooter>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default HomeView