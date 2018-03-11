const React = require('react');
const api = require('../utils/api');
const { Link } = require('react-router-dom');
const queryString = require('query-string');
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');

const Player = props => (
  <div>
    <h1 className="header">{props.label}</h1>
    <h3 className="align-center"> {'with score: ' + props.score}</h3>
    <PlayerPreview
      avatar={props.profile.avatar_url}
      username={props.profile.login}
    >
      <div>
        <p>{'Followers: ' + props.profile.followers}</p>
        <p>{'Public repos: ' + props.profile.public_repos}</p>
      </div>
    </PlayerPreview>
  </div>
);

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName, players.playerTwoName]).then(res => {
      if (!res) {
        return this.setState({ error: 'error encountered', loading: false });
      }
      this.setState({ winner: res[0], loser: res[1], loading: false });
    });
  }

  render() {
    let { winner, loser, error, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link className="button" to="/battle">
            {' '}
            Reset.{' '}
          </Link>
        </div>
      );
    }

    return (
      <div className="row">
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    );
  }
}

module.exports = Results;
