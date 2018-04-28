// utility functions like validators, alert etc
import Noty from 'noty'

import _ from 'lodash'

export const alert = (options) => {
  const default_options = {
    type: 'success',
    timeout: 1000,
    theme: 'sunset'
  }

  let opts = Object.assign({}, default_options, options)

  new Noty(opts).show()
}

// task title validator
export const taskTitleValidator = (title) => {
  // title should not be empty
  if (_.isEmpty(title)) {
    return {
      success: false,
      message: "Title should not be empty"
    }
  }

  // title should not be more than 80 characters
  if (_.size(title) > 80) {
    return {
      success: false,
      message: "Title should not be greater than 80 characters"
    } 
  }

  // all fine
  return {
    success: true
  }

}

// board title validator
export const boardTitleValidator = (title) => {
  // title should not be empty
  if (_.isEmpty(title)) {
    return {
      success: false,
      message: "Title should not be empty"
    }
  }

  // title should not be more than 80 characters
  if (_.size(title) > 30) {
    return {
      success: false,
      message: "Title should not be greater than 30 characters"
    } 
  }

  // all fine
  return {
    success: true
  }  
}
