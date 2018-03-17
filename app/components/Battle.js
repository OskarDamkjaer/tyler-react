const React = require('react');
const PropTypes = require('prop-types');
const {Link} = require('react-router-dom');
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    //we want to make sure "this" in handleChange refers to component scope
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //grabs text from input field
    const value = event.target.value;
    this.setState(function() {
      return {username: value};
    });
  }

  handleSubmit(event) {
    //We don't want to do standard POST to server
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    //handleSubmit is called when button submit event happens
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit.
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit.bind(this);
    this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      const newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] =
        'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      const newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div className="battle-container">
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit.bind(this)}
            />
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit.bind(this)}
            />
          )}

          {playerOneImage !== null && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button
                className="reset"
                onClick={this.handleReset.bind(this, 'playerOne')}>
                reset
              </button>
            </PlayerPreview>
          )}

          {playerTwoImage !== null && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button
                className="reset"
                onClick={this.handleReset.bind(this, 'playerOne')}>
                reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage &&
          playerTwoName && (
            <Link
              className="button"
              to={{
                pathname: this.props.match.url + '/results',
                search:
                  '?playerOneName=' +
                  playerOneName +
                  '&playerTwoName=' +
                  playerTwoName,
              }}>
              Battle
            </Link>
          )}
      </div>
    );
  }
}

//We need to bind twice for some reason?

module.exports = Battle;
