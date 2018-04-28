// simple modal to show the task
import React from 'react'

import {
  Button,
  Form, FormGroup, Input, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditTaskModal extends React.Component {
  constructor(props) {
    super(props)
    // setting the state
    this.state = {
      id: props.id,
      title: props.title,
      description: props.description,
      list_id: props.list_id
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggleHandler}>
        <ModalHeader toggle={this.props.toggleHandler}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Form>
            {/* title */}
            <FormGroup>
              <Label for="taskTitle">Title:</Label>
              <Input type="text" name="title" id="taskTitle" value={this.state.title} 
                onChange={(e) => this.setState({
                  title: e.target.value
                })}
              />
            </FormGroup>
            {/* description */}
            <FormGroup>
              <Label for="taskDescription">Description</Label>
              <Input type="textarea" name="taskDescription" id="taskDescription" value={this.state.description} 
                onChange={(e) => this.setState({
                  description: e.target.value
                })}
              />
            </FormGroup>
            {/* List */}
            <FormGroup>
              <Label for="taskList">Change List</Label>
              <Input type="select" name="taskList" id="taskList" value={this.state.list_id}
                onChange={(e) => this.setState({
                  list_id: parseInt(e.target.value, 10)
                })}
              >
                {
                  this.props.lists.map((l) => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))
                }
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => this.props.deleteHandler(this.state.id)}>Delete Task</Button>{' '}
          <Button color="success" onClick={() => this.props.updateHandler(this.state)}>Update Task</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleHandler}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditTaskModal