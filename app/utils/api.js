const axios = require('axios')

module.exports = {
  fetchPopularRepos: lang => {
    'use strict'
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lang + '&sort=stars&order=desc&type=Repositories')
    return axios.get(encodedURI).then(resp => resp.data.items)
  }
}