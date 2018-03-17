const React = require('react');
const PropTypes = require('prop-types');

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }
  componentDidMount() {
    const stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({text: this.props.text});
      } else {
        this.setState(prevState => {
          return {text: prevState.text + '.'};
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles}>{this.state.text}</p>;
  }
}

const styles = {
  textAlign: 'center',
  fontSize: '25px',
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

module.exports = Loading;
