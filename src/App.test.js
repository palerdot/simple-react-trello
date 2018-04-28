import React from 'react'
import ReactDOM from 'react-dom'

// configure enzyme
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// enzyme for component testing
import { mount, shallow } from 'enzyme'

import { expect } from 'chai'

import App from './App'

// import our stateless components
import BoardView from './components/presentation/BoardView'
import ListView from './components/presentation/ListView'
import TaskView from './components/presentation/ListView'

// redux related stuffs to wrap the store for full mounting
import { Provider } from 'react-redux'

// create a redux store
import { createStore } from 'redux'
import appReducer from './reducers'

// utils to be validated
import {
  taskTitleValidator,
  boardTitleValidator,
} from './utils/'

// create store
let store = createStore(appReducer)

it('should render board view with 0 lists', () => {
  const wrapper = shallow(<BoardView lists={[]} />)
  expect( wrapper.find(ListView) ).to.have.length(0)
})

it('should render board view with 2 lists', () => {

  let default_lists = [
    {
      id: 1,
      title: 'List 1'
    },
    {
      id: 2,
      title: 'List 2'
    }
  ]

  const wrapper = mount(
    <Provider store={store}>
      <BoardView lists={default_lists} />
    </Provider>
  )

  expect( wrapper.find(ListView) ).to.have.length(2)
})

it('Task title should not be empty', () => {
  const title = ""
  let { success, message } = taskTitleValidator(title)

  expect(success).to.equal(false)
})

it('Task title should not be more than specific characters', () => {
  const title = "long title .... long title ... long title .... long title ... long title .... long title ... long title .... long title ... long title .... long title ... "
  let { success, message } = taskTitleValidator(title)
  
  expect(success).to.equal(false)
})

it('Task title should be valid', () => {
  const title = "valid small title"
  let { success, message } = taskTitleValidator(title)

  expect(success).to.equal(true)
})

it('Board title should not be empty', () => {
  const title = ""
  let { success, message } = boardTitleValidator(title)

  expect(success).to.equal(false)
})

it('Board title should not be more than specific characters', () => {
  const title = "long title .... long title ... long title .... long title ... long title .... long title ... long title .... long title ... long title .... long title ... "
  let { success, message } = boardTitleValidator(title)
  
  expect(success).to.equal(false)
})

it('Board title should be valid', () => {
  const title = "Default Board"
  let { success, message } = boardTitleValidator(title)

  expect(success).to.equal(true)
})
