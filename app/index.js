const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')
require('./index.css')

class App extends React.Component {
  render () {
    return ( <div>
        Hello {this.props.name}!
      </div>
    )
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
}

ReactDOM.render(
  <App name="oskar"/>,
  document.getElementById('app')
)