import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './MatchupCard.scss';
import TeamCard from '../TeamCard/TeamCard';
import MatchupInfo from '../MatchupInfo/MatchupInfo';
import SubmitButton from '../SubmitButton/SubmitButton';
import DateSelect from '../DateSelect/DateSelect';

class MatchupCard extends React.PureComponent {
  state = {
    gameInfo: this.props.gameInfo
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    this.setState({
      gameInfo: this.props.gameInfo
    });
  }

  render() {
    console.log(this.props.gameInfo.currentPickIndex);
    if (this.state.gameInfo.response) {
      const homeTeam = this.state.gameInfo.picks[this.props.gameInfo.currentPickIndex].homeTeam;
      const awayTeam = this.state.gameInfo.picks[this.props.gameInfo.currentPickIndex].awayTeam;

      return (
        <div className={classnames(`MatchupCard`, this.props)}>
          <DateSelect date={this.props.gameInfo.date} />
          <div className={classnames(`MatchupCard`, this.props.className)}>
            <div className="teamAssign">
              <h2 className="teamTag">HOME</h2>
              <TeamCard teamName={homeTeam} />
            </div>
            <div className="teamAssign">
              <h2 className="teamTag">AWAY</h2>
              <TeamCard teamName={awayTeam} />
            </div>
            <h2 className="teamTag">THE MATCHUP</h2>
            <div className="teamAssign">
              <MatchupInfo teamName={homeTeam} />
            </div>
            <div className="teamAssign">
              <MatchupInfo teamName={awayTeam} />
            </div>
            <h2 className="teamTag">swipe to view more games</h2>
            <SubmitButton />
          </div>
        </div>
      );
    }
    return <p>Loading..</p>;
  }
}

MatchupCard.propTypes = checkProps({
  className: PropTypes.string,
  gameInfo: PropTypes.object
});

MatchupCard.defaultProps = {};

export default MatchupCard;
