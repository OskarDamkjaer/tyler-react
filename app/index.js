const React = require('react')
const ReactDOM = require('react-dom')
require('./index.css')
const App = require('./components/App')

ReactDOM.render(
  <App name="oskar"/>,
  document.getElementById('app')
)