/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaLightbulb } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { changeTheme, settingsEnd } from '../redux/actions';

class Settings extends Component {
  state = {
    categories: [],
    dificult: '',
    type: '',
    category: 0,
  };

  async componentDidMount() {
    const urlCategory = 'https://opentdb.com/api_category.php';
    const response = await fetch(urlCategory);
    const result = await response.json();
    this.setState({ categories: result.trivia_categories });
  }

  onSelectChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onClickHome = () => {
    const { dispatch, history } = this.props;
    dispatch(settingsEnd(this.state));
    history.push('/');
  };

  onClickLight = () => {
    const { theme, dispatch } = this.props;
    const root = document.documentElement;
    if (theme === 'white') {
      root.style.setProperty('--main-color', '#483D8B');
      root.style.setProperty('--header-color', 'black');
      root.style.setProperty('--header-font-color', 'white');
      return dispatch(changeTheme('black'));
    }
    if (theme === 'black') {
      root.style.setProperty('--main-color', '#7B68EE');
      root.style.setProperty('--header-color', 'white');
      root.style.setProperty('--header-font-color', 'rgb(17, 17, 17)');
      return dispatch(changeTheme('white'));
    }
  };

  render() {
    const { theme } = this.props;
    const { categories } = this.state;
    return (
      <div className="Settings">
        <div className="SettingsHeader">
          <h1 data-testid="settings-title" className="SettingsTitle">CONFIGURAÇÕES</h1>
          <label htmlFor="theme">
            { theme === 'black' ? <FaLightbulb className="SettingsThemeIconOff" />
              : <FaLightbulb className="SettingsThemeIconOn" />}
            <button
              type="button"
              id="theme"
              onClick={ this.onClickLight }
              style={ { display: 'none' } }
            />
          </label>
        </div>
        <select
          name="category"
          id=""
          onChange={ this.onSelectChange }
          className="SettingsSelect"
        >
          <option value="">CATEGORY</option>
          <option value="">all</option>
          {categories
            .map((ele) => (
              <option key={ ele.id } value={ ele.id }>
                {ele.name}
              </option>
            ))}
        </select>
        <label htmlFor="dificult">
          <select
            name="dificult"
            id="dificult"
            onChange={ this.onSelectChange }
            className="SettingsSelect"
          >
            <option value="">DIFICULT</option>
            <option value="">all</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <label htmlFor="type">
          <select
            name="type"
            id="type"
            className="SettingsSelect"
            onChange={ this.onSelectChange }
          >
            <option value="">TYPE</option>
            <option value="">all</option>
            <option value="multiple">multiple</option>
            <option value="boolean">boolean</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onClickHome }
          className="SettingsHome"
        >
          HOME
          {' '}
          <IoHomeSharp className="RankingHomeIcon" />
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  theme: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  theme: globalState.settings.theme,
});

export default connect(mapStateToProps)(Settings);
