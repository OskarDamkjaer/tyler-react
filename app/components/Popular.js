const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')

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

function RepoGrid (props) {
  'use strict'
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li className='popular-item' key={repo.name}>
            <div className='popular-rank'>#{index + 1}</div>
            <ul>
              <li className='space-list-item'>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}/>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}
                </a>
              </li>
              <li>
                @{repo.owner.login}
              </li>
              <li>
                {repo.stargazers_count} stars.
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage (lang) {
    this.setState(
      {selectedLanguage: lang, repos: null}
    )
    api.fetchPopularRepos(lang).then(repos => this.setState({repos}))
    //Vi slipper hålla på och .binda om this för att gör setstate, eftersom vi använder that sweet arrow notation.
  }

  render () {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/>
        {!this.state.repos ? <p> fetching repos... </p> : <RepoGrid repos={this.state.repos}/>}
      </div>
    )
  }
}

//Hur påverkar arrow functions "this-management"
//Vi vill nog flytta både languages och cssen ut ur komponenten? iaf ut ur inline
//Mycket av pillandet i repsponseitem vill vi nog göra i API utils.

module.exports = Popular