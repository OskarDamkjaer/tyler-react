const React = require('react')
const PropTypes = require('prop-types')

class Popular extends React.Component {
  render () {
    const languages = ['All', 'JavaScript', 'Haskell', 'Java', 'Pyton', 'C']
    return ( <div className='languages'>
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
      </div>
    )
  }
}

module.exports = Popular