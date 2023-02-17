import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { BsStarFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { emailDoUsuário, name, score } = this.props;
    const email = md5(emailDoUsuário).toString();
    return (
      <header className="Header">
        <div className="HeaderUser">
          <img
            className="HeaderUserImg"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt={ name }
          />
          <p data-testid="header-player-name" className="HeaderNickname">{name}</p>
        </div>
        <p data-testid="header-score" className="HeaderScore">
          <BsStarFill className="HeaderIcon" />
          {`Score: ${score}`}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  emailDoUsuário: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

Header.propTypes = {
  emailDoUsuário: string,
  name: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
