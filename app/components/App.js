const React = require('react')
const Popular = require('./Popular')
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch
const Home = require('../components/Home')
const Battle = require('../components/Battle')
const Results = require('../components/Results')
const Nav = require('../components/Nav')
const PageNotFound = require('../components/PageNotFound')

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/battle' component={Battle}/>
            <Route path='/battle/results' component={Results}/>
            <Route path='/popular' component={Popular}/>
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App