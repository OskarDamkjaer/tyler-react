const React = require('react')
const PropTypes = require('prop-types')

const PlayerPreview = props => (
  <div>
    <div className="column">
      <img
        className="avatar"
        src={props.avatar}
        alt={'Avatar for ' + props.username}
      />
      <h2 className='username'>@{props.username}</h2>
    </div>
    {props.children}
  </div>
)

//Don't care abtout context of onReset but want to return a new function that takes more paramenters
PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview
