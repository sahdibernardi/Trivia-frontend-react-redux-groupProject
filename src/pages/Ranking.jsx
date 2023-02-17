import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoHomeSharp } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import { getPlayersRanking } from '../localStorage';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const max = 5;
    const rank = getPlayersRanking().slice(0, max);
    this.setState({ rank });
  }

  homeBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rank } = this.state;
    return (
      <main className="Ranking">
        <div className="RankingLeaders">
          <h1 data-testid="ranking-title">Ranking</h1>
          {rank.map((element, index) => (
            <div key={ index } className="RankingLeader">
              <div className="RankingUser">
                <img
                  src={ `https://www.gravatar.com/avatar/${element.email}` }
                  alt={ element.name }
                  className="RankingLeaderImg"
                />
                <p
                  data-testid={ `player-name-${index}` }
                  style={ { margin: '10px' } }
                >
                  {element.name}

                </p>
              </div>
              <div className="RankingScore">
                <BsStarFill className="RankingIcon" />
                <p
                  data-testid={ `player-score-${index}` }
                  style={ { fontFamily: 'sans-serif' } }
                >
                  <strong>{element.score}</strong>
                  {' '}
                  points
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={ this.homeBtn }
            data-testid="btn-go-home"
            className="RankingBtn"
          >
            <IoHomeSharp className="RankingHomeIcon" />
            {' '}
            HOME

          </button>
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default connect(null)(Ranking);
