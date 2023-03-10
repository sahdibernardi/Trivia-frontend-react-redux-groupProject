import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import Header from '../componentes/Header';
import { getPlayersRanking, savePlayersRanking } from '../localStorage';

class Feedback extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const tres = 3;
    this.saveRank();
    if (+assertions < tres) {
      return this.setState({ text: 'Could be better...' });
    } this.setState({ text: 'Well Done!' });
  }
  // problema teste linha 19.

  saveRank = () => {
    const { emailDoUsuário, name, score } = this.props;
    const email = md5(emailDoUsuário).toString();
    const array = [];
    const id = array.length;
    const rankPlayer = { email, name, score, id };
    if (getPlayersRanking() === null) {
      array.push(rankPlayer);
      return savePlayersRanking(array);
    }
    const players = getPlayersRanking();
    const newRank = [...players, rankPlayer];
    savePlayersRanking(newRank.sort((a, b) => b.score - a.score));
  };

  playAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingBtn = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { text } = this.state;
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <main className="FeedbackMain">
          <div className="FeedbackScoreboard">
            <p data-testid="feedback-text" className="FeedbackText">{text}</p>
            <p data-testid="feedback-total-score">
              {
                `Your total score is ${score} points!`
              }
            </p>
            <p data-testid="feedback-total-question">
              {`Your number of assertions is ${assertions}`}
            </p>
          </div>
          <div className="FeedbackBtns">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgainBtn }
              className="FeedbackBtn"
            >
              PLAY AGAIN

            </button>
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.rankingBtn }
              className="FeedbackBtn"
            >
              RANKING

            </button>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  emailDoUsuário: globalState.player.gravatarEmail,
  name: globalState.player.name,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
  emailDoUsuário: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
