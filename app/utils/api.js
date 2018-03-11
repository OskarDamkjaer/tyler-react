const axios = require('axios')

const getUserData = player => {
  return axios.all([getProfile(player), getRepos(player)]).then(promise => {
    const profile = promise[0].data
    const repos = promise[1].data
    return {
      profile,
      score: calcScore(profile, repos),
    }
  })
}

const getProfile = player =>
  axios.get('https://api.github.com/users/' + player)

const getRepos = player =>
  axios.get('https://api.github.com/users/' + player + '/repos')

const calcScore = (profile, repos) =>
  profile.followers * 3 + getStarCount(repos)

const scoreSort = players => players.sort((a, b) => b.score - a.score)

const getStarCount = repos =>
  repos.reduce((count, repo) => count + repo.stargazers_count, 0)

const logError = err => {
  console.log(err)
  return null
}

module.exports = {
  battle: players => {
    return axios
      .all(players.map(getUserData))
      .then(scoreSort)
      .catch(logError)
  },
  fetchPopularRepos: lang => {
    'use strict'
    const encodedURI = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
      lang +
      '&sort=stars&order=desc&type=Repositories',
    )
    return axios.get(encodedURI).then(resp => resp.data.items)
  },
}