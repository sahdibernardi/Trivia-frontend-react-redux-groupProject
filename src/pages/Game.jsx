import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import { getCards,
  getQuestionsWithCategory,
  getQuestionsWithCategorywithDificult,
  getQuestionsWithCategorywithType,
  getQuestionsWithDificult,
  getQuestionsWithDificultWithType,
  getQuestionsWithDificultWithTypeWithCategory,
  getQuestionsWithtype } from '../services/tokenApi';
import { deletToken } from '../localStorage';
import Question from '../componentes/Question';

class Game extends Component {
  state = {
    questions: [],
    num: -1,
    question: [],
    loading: true,
  };

  async componentDidMount() {
    await this.getApi();
    this.setState({ loading: false });
  }

  componentDidUpdate() {
    const { questionNumber } = this.props;
    const { questions, num } = this.state;
    if (questionNumber > num) {
      this.setState({ loading: true }, () => {
        const question = questions.filter((e) => e === questions[questionNumber]);
        this.setState({ question, num: (num + 1), loading: false });
      });
    }
  }

  getApi = async () => {
    const { categories, type, dificult } = this.props;
    const result = await getCards();
    if (result.response_code === 0) {
      if (categories > 0
        || type.length > 0 || dificult.length > 0) return this.getApiFiltred();
      this.setState({ questions: result.results });
    }
    const tres = 3;
    if (result.response_code === tres) {
      const { history } = this.props;
      deletToken();
      history.push('/');
    }
  };

  getApiFiltred = async () => {
    const { categories, type, dificult } = this.props;
    if (categories === 0 && type.length === 0) {
      const result = await getQuestionsWithDificult(dificult);
      return this.setState({ questions: result.results });
    }
    if (dificult.length === 0 && categories === 0) {
      const result = await getQuestionsWithtype(type);
      return this.setState({ questions: result.results });
    }
    if (dificult.length === 0 && type.length === 0) {
      const result = await getQuestionsWithCategory(categories);
      return this.setState({ questions: result.results });
    }
    if (dificult.length === 0) {
      const result = await getQuestionsWithCategorywithType(categories, type);
      return this.setState({ questions: result.results });
    }
    if (type.length === 0) {
      const result = await getQuestionsWithCategorywithDificult(categories, dificult);
      return this.setState({ questions: result.results });
    }
    if (categories === 0) {
      const result = await getQuestionsWithDificultWithType(dificult, type);
      return this.setState({ questions: result.results });
    }
    if (categories > 0 && type.length > 0 && dificult.length > 0) {
      const result = await getQuestionsWithDificultWithTypeWithCategory(
        dificult,
        type,
        categories,
      );
      return this.setState({ questions: result.results });
    }
  };

  render() {
    const { question, loading } = this.state;
    return (
      <div className="Game">
        <Header />
        {loading ? <p>loading...</p>
          : (
            question.map((element, index) => (
              <Question
                key={ index }
                correctAnswer={ element.correct_answer }
                incorrectAnswers={ element.incorrect_answers }
                category={ element.category }
                question={ element.question }
                difficulty={ element.difficulty }
              />
            ))
          )}
      </div>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
  questionNumber: propTypes.number.isRequired,
  categories: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  dificult: propTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  questionNumber: globalState.question.questionNumber,
  categories: globalState.settings.categories,
  type: globalState.settings.type,
  dificult: globalState.settings.dificult,
});

export default connect(mapStateToProps)(Game);
