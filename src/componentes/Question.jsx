import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsFillCheckCircleFill, BsFillXCircleFill,
  BsFillArrowRightCircleFill } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';
import { addAssertions, addQuestionNumber,
  addScore, changeTime, hasClassAction } from '../redux/actions';
import Chronometer from './Chronometer';

class Question extends Component {
  state = {
    answers: [],
    time: 30,
  };

  componentDidMount() {
    const array = this.answersArray();
    const arrayShuffle = this.shuffle(array);
    this.setState({ answers: arrayShuffle });
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { hasClass } = this.props;
    if (time > 0 && !hasClass) {
      const { dispatch } = this.props;
      const seconds = 1000;
      setTimeout(() => {
        if (time === 1) {
          dispatch(hasClassAction(true));
        }
        const newTime = (time - 1);
        this.setState({ time: newTime });
      }, seconds);
    }
  }

  shuffle = (array) => {
    const shuffledArray = [];
    const usedIndexes = [];

    let i = 0;
    while (i < array.length) {
      const randomNumber = Math.floor(Math.random() * array.length);
      if (!usedIndexes.includes(randomNumber)) {
        shuffledArray.push(array[randomNumber]);
        usedIndexes.push(randomNumber);
        i += 1;
      }
    }
    return shuffledArray;
    // peguei essa função daqui https://openjavascript.info/2022/03/14/how-to-shuffle-an-array-in-javascript/
  };

  answersArray = () => {
    const { correctAnswer, incorrectAnswers } = this.props;
    const objRight = {
      dataTestId: 'correct-answer',
      answer: correctAnswer,
      type: 'right',
      id: 3,
      icon: <BsFillCheckCircleFill className="QuestionRightIcon" />,
    };
    const arrayAnswersWrongs = incorrectAnswers.map((ele, index) => {
      const objIncorect = {
        dataTestId: `wrong-answer-${index}`,
        answer: ele,
        id: index,
        type: 'wrong',
        icon: <BsFillXCircleFill className="QuestionWrongIcon" />,
      };
      return objIncorect;
    });
    arrayAnswersWrongs.push(objRight);
    const answers = arrayAnswersWrongs;
    return answers;
  };

  valueOfDifficulty = () => {
    const { difficulty } = this.props;
    const tres = 3;
    const dois = 2;
    switch (difficulty) {
    case 'hard': return tres;
    case 'medium': return dois;
    case 'easy': return 1;
    default: return 0;
    }
  };

  sumOfScore = () => {
    const dez = 10;
    const { dispatch } = this.props;
    const { time } = this.state;
    const pontuacao = dez + (time + this.valueOfDifficulty());
    dispatch(addScore(pontuacao));
  };

  handleQuestionClick = ({ target: { name } }) => {
    const { dispatch, hasClass } = this.props;
    dispatch(hasClassAction(true));
    if (name === 'right' && !hasClass) {
      const { assertions } = this.props;
      dispatch(addAssertions((assertions + 1)));
      this.sumOfScore();
    }
  };

  nextBtn = () => {
    const { dispatch, questionNumber } = this.props;
    const lastQuestionNumber = 4;
    const fullTime = 30;
    dispatch(changeTime(fullTime));
    dispatch(hasClassAction(false));
    if (questionNumber === lastQuestionNumber) {
      const { history } = this.props;
      return history.push('/feedback');
    }
    dispatch(addQuestionNumber(questionNumber + 1));
  };

  render() {
    const { time } = this.state;
    const { category, question, hasClass } = this.props;
    const { answers } = this.state;
    return (
      <main className="Question">
        <div className="Question-questions">
          <h2 data-testid="question-category" className="QuestionTittle">{category}</h2>
          <p data-testid="question-text">{question}</p>
          <Chronometer time={ time } />
        </div>
        <aside data-testid="answer-options" className="QuestionAnswerOptions">
          {answers
            .map((element) => (
              <button
                key={ element.dataTestId }
                type="button"
                name={ element.type }
                data-testid={ element.dataTestId }
                disabled={ time === 0 }
                className={ hasClass ? element.type : 'btn-Default' }
                onClick={ this.handleQuestionClick }
              >
                {hasClass && element.icon}
                {' '}
                {element.answer}
              </button>
            ))}
          {hasClass && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextBtn }
              className="QuestionNextBtn"
            >
              NEXT
              <BsFillArrowRightCircleFill style={ { paddingLeft: '6px' } } />
            </button>
          )}
        </aside>
      </main>
    );
  }
}

Question.propTypes = {
  category: propTypes.string.isRequired,
  question: propTypes.string.isRequired,
  correctAnswer: propTypes.string.isRequired,
  incorrectAnswers: propTypes.shape.isRequired,
  dispatch: propTypes.func.isRequired,
  hasClass: propTypes.bool.isRequired,
  difficulty: propTypes.string.isRequired,
  questionNumber: propTypes.number.isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
  assertions: propTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  hasClass: globalState.question.hasClass,
  questionNumber: globalState.question.questionNumber,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(withRouter(Question));
