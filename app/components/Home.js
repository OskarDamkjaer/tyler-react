const React = require('react')
const {Link} = require('react-router-dom')

class Home extends React.Component {
  render () {
    return (
      <div className='home-container'>
        <h1>
          github battle!
        </h1>
        <Link className='button' to='/battle'>
          let's go!
        </Link>
      </div>
    )
  }
}

module.exports = Home