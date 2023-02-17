/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsController } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import { saveToken } from '../localStorage';
import { endGame, loginState } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
    disable: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(endGame());
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate());
  };

  validate = () => {
    const { email, name } = this.state;
    const validateEmail = email.length > 0;
    const validateName = name.length > 0;
    const validates = validateEmail && validateName;
    if (validates) {
      return this.setState({ disable: false });
    } this.setState({ disable: true });
  };

  clickSetting = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  onClickBtn = async () => {
    const { history, dispatch } = this.props;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const reponse = await fetch(url);
    const result = await reponse.json();
    saveToken(result.token);
    await dispatch(loginState(this.state));
    history.push('/game');
  };

  render() {
    const { disable } = this.state;
    return (
      <div className="Login">
        <BsController className="LoginIcon" />
        <aside className="LoginAside">
          <form className="LoginForms" autoComplete="off">
            <label htmlFor="settings" className="LoginSettingsLabel">
              <IoSettings className="LoginSettings" />
              <button
                data-testid="btn-settings"
                type="button"
                // disabled={ disable }
                id="settings"
                onClick={ this.clickSetting }
                className="LoginButtonSettings"
              >
                Settings
              </button>
            </label>
            <label htmlFor="email">
              <h3>EMAIL</h3>
              <input
                data-testid="input-gravatar-email"
                name="email"
                type="text"
                id="email"
                onChange={ this.onInputChange }
                className="LoginInput"
                placeholder="test@gmail.com"
              />
            </label>

            <label htmlFor="name">
              <h3>NAME</h3>
              <input
                data-testid="input-player-name"
                name="name"
                type="text"
                id="name"
                onChange={ this.onInputChange }
                className="LoginInput"
                placeholder="Your name"
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              onClick={ this.onClickBtn }
              disabled={ disable }
              className="LoginButtonPlay"
            >
              PLAY
              <FaPlay style={ { paddingLeft: '10px' } } />
            </button>
          </form>
        </aside>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default connect(null)(Login);
