const React = require('react')
const PropTypes = require('prop-types')
const Popular = require('./Popular')

class App extends React.Component {
  render () {
    return ( <div className='container'>
        <Popular/>
      </div>
    )
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
}

module.exports = App