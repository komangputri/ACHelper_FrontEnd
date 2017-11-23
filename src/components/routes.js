import {Router, Route} from 'react-router'
import App from './App'
import React from 'react'

export default (props) => (
  <Router {...props}>
    <Route path='/' component={App} />
  </Router>
)
