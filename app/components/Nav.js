const React = require('react');
const {Link, NavLink} = require('react-router-dom')

function Nav() {
  'use strict';
  return(
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          BATTLE
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          POPULAR
        </NavLink>
      </li>
    </ul>
  )

}

module.exports = Nav;
