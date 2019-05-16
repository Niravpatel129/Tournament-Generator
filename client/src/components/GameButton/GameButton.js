import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './GameButton.scss';

import checkProps from '@jam3/react-check-extra-props';
class GameButton extends React.PureComponent {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}
  pageRedirectChooser = () => {
    if (!localStorage.getItem('token')) {
      return '/login';
    } else {
      return '/picks';
    }
  };
  render() {
    return (
      <div className={classnames(`GameButton`, this.props.className)}>
        <a href={this.pageRedirectChooser()}>
          <div className="button-box">
            <img className="button" src={require('../../../src/assets/svg/Button.svg')} alt="Play" />
          </div>
        </a>
      </div>
    );
  }
}

GameButton.propTypes = checkProps({
  className: PropTypes.string
});

GameButton.defaultProps = {};

export default GameButton;
