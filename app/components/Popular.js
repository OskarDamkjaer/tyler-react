const React = require('react')
const PropTypes = require('prop-types')

//Simple components can be created as a function returning the render. Does not need "this".
function SelectLanguage (props) {
  const languages = ['All', 'JavaScript', 'Haskell', 'Java', 'Pyton', 'C']

  return (
    <div className='languages'>
      <ul>
        {languages.map(lang => {
          return (
            <li
              style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
              onClick={props.onSelect.bind(null, lang)}
              key={lang}>
              {lang}
            </li>)
        })}
      </ul>
    </div>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage (lang) {
    this.setState(
      {selectedLanguage: lang}
    )
  }

  render () {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/>
      </div>
    )
  }
}

//Hur påverkar arrow functions "this-management"
//Vi vill nog flytta både languages och cssen ut ur komponenten? iaf ut ur inline

module.exports = Popular