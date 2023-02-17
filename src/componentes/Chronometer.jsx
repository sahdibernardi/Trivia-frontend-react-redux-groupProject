import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chronometer extends Component {
  render() {
    const { time } = this.props;
    return (
      <div>
        <svg height="100" width="200">
          <circle
            cx="100"
            cy="60"
            r="30"
            y="86"
            fill="transparent"
            x1="20"
            stroke="red"
            strokeWidth="4"
          />
          <circle
            strokeDasharray={ 220 }
            // eslint-disable-next-line no-magic-numbers
            strokeDashoffset={ 220 - (220 * time) / 35 }
            cx="100"
            cy="60"
            r="30"
            y="86"
            fill="transparent"
            x1="20"
            stroke="green"
            strokeWidth="4"
          />
          <text
            fontSize="35"
            fontFamily="Verdana"
            x="80"
            y="75"
          >
            { time }
          </text>
        </svg>
      </div>
    );
  }
}

Chronometer.propTypes = {
  time: PropTypes.number,
}.isRequired;

export default Chronometer;
