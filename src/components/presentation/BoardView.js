import React from 'react'

import _ from 'lodash'

import {
  Container,
  Input, Button,
} from 'reactstrap'

// import Lists to connect
import List from '../container/List'

// functional componet that has ref (not exactly stateless but not stateful either?)
function BoardView(props) {
  // textInput must be declared here so the ref can refer to it
  let textInput = false

  function handleAddList() {
    // let title = this.newListTitle.value.trim()
    let input = textInput
    let title = input.value
    // do not proceed if title is empty
    if (_.isEmpty(title)) {
      return
    }
    props.addListHandler(title)
    // clear the input
    // this.newListTitle.value = ''
    input.value = ''
  }

  return (
    <Container fluid className="board">
      {
        props.lists.map((l) => (
          <List
            key={l.id}
            id={l.id} 
            title={l.title}
            board_id={props.id}
          />
        ))
      }
      <div className="list">
        <div className="footer list-footer">
          <Input 
            type="text"
            placeholder="Enter List Title ..."
            innerRef={(ref) => textInput = ref}
          />
          <Button outline block color="primary"
            onClick={handleAddList}
          >
            <span className="oi" data-glyph="plus" title="add task" aria-hidden="true"></span>{' '}
            {' '} Add List
          </Button>{' '}
        </div>
      </div>
    </Container>
  )
}

/*const BoardView = (props) => (
  
)*/

export default BoardView