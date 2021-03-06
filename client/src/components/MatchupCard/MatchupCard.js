import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '@jam3/react-check-extra-props';

import './MatchupCard.scss';
import TeamCard from '../TeamCard/TeamCard';
import MatchupInfo from '../MatchupInfo/MatchupInfo';
import SubmitButton from '../SubmitButton/SubmitButton';
import Date from '../Date/Date';
import Indicator from '../Indicator/Indicator';

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
    //wait until the api has responded
    if (this.state.gameInfo.response === 1) {
      const teams = this.state.gameInfo.picks[this.props.gameInfo.currentPickIndex];

      //determine whether a card has been selected for styling
      let homeClass = '';
      if (this.props.gameInfo.picks[this.props.gameInfo.currentPickIndex].selection === teams.homeTeam) {
        homeClass += 'teamSelected';
      }
      let awayClass = '';
      if (this.props.gameInfo.picks[this.props.gameInfo.currentPickIndex].selection === teams.awayTeam) {
        awayClass += 'teamSelected';
      }

      // assign teams to playerData from stored data
      var homeTeamData = [],
        awayTeamData = [];
      const stats = this.props.gameInfo.stats;

      stats.map(stat => {
        if (stat.teamId === teams.homeTeamId) homeTeamData = stat.playerStats;
        if (stat.teamId === teams.awayTeamId) awayTeamData = stat.playerStats;
        return 0;
      });

      if (window.innerWidth > 1024) {
        return (
          <div className={classnames(`MatchupCard`, this.props)}>
            <Date date={this.props.gameInfo.date} />
            <div className={classnames(`MatchupCard`, this.props.className)}>
              <div className="teamAssign">
                <h2 className="teamTag">HOME</h2>
                <TeamCard className={homeClass} teamName={teams.homeTeam} onVote={this.props.onVote} />
              </div>
              <div className="teamAssign">
                <h2 className="teamTag">AWAY</h2>
                <TeamCard className={awayClass} teamName={teams.awayTeam} onVote={this.props.onVote} />
              </div>
              <h2 className="teamTag">THE MATCHUP</h2>
              <div className="teamAssign">
                <MatchupInfo className={homeClass} teamName={teams.homeTeam} teamStats={homeTeamData} />
              </div>
              <div className="teamAssign">
                <MatchupInfo className={awayClass} teamName={teams.awayTeam} teamStats={awayTeamData} />
              </div>
              <ul className="carousel__indicators">
                {this.props.gameInfo.picks.map((pick, index) => (
                  <Indicator
                    length={this.props.gameInfo.picks.length}
                    index={index}
                    key={index}
                    activeIndex={this.props.gameInfo.currentPickIndex}
                    onClick={e => this.props.goToSlide(index)}
                  />
                ))}
              </ul>
              <SubmitButton onSubmit={this.props.onSubmit} />
            </div>
          </div>
        );
      } else {
        return (
          <div className={classnames(`MatchupCard`, this.props)}>
            <Date date={this.props.gameInfo.date} />
            <div className={classnames(`MatchupCard`, this.props.className)}>
              <div className="teamAssign">
                <h2 className="teamTag">HOME</h2>
                <TeamCard className={homeClass} teamName={teams.homeTeam} onVote={this.props.onVote} />
              </div>
              <div className="teamAssign">
                <h2 className="teamTag">AWAY</h2>
                <TeamCard className={awayClass} teamName={teams.awayTeam} onVote={this.props.onVote} />
              </div>
            </div>
            <ul className="carousel__indicators">
              {this.props.gameInfo.picks.map((pick, index) => (
                <Indicator
                  length={this.props.gameInfo.picks.length}
                  index={index}
                  key={index}
                  activeIndex={this.props.gameInfo.currentPickIndex}
                  onClick={e => this.props.goToSlide(index)}
                />
              ))}
            </ul>
            <SubmitButton onSubmit={this.props.onSubmit} />
          </div>
        );
      }
    }
    return <div className="noData">There are no games being played today</div>;
  }
}

MatchupCard.propTypes = checkProps({
  className: PropTypes.string,
  gameInfo: PropTypes.object,
  onVote: PropTypes.func,
  onSubmit: PropTypes.func,
  goToSlide: PropTypes.func
});

MatchupCard.defaultProps = {};

export default MatchupCard;
