import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { START_GAME, UPDATE_PLAYER_NAME, INCREASE_PLAYER_SCORE } from './../reducers/rootReducer'
import PlayerView from './PlayerView'

const MatchView = React.createClass({
  propTypes: {
    gameInProgress: PropTypes.bool.isRequired,
    team1: PropTypes.object.isRequired,
    team2: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired
  },

  buttonColor(gameStartable, gameInProgress) {
    return !gameStartable ? '#ccc' : gameInProgress ? 'red' : 'green'
  },
  render() {
    const playerEditable = !this.props.gameInProgress
    const team1 = this.props.team1
    const team2 = this.props.team2
    return (
      <View style={{flex: 1}}>
        <View style={styles.teamContainer}>
          <View style={styles.teamPlayersContainer}>
            <PlayerView editable={playerEditable}
                        name={team1.attacker.name}
                        role={'attacker'}
                        onNameChange={this.updatePlayerName('team1', 'attacker')}
                        onTap={this.increasePlayerScore('team1', 'attacker')}/>
            <PlayerView editable={playerEditable}
                        name={team1.defender.name}
                        role={'defender'}
                        onNameChange={this.updatePlayerName('team1', 'defender')}
                        onTap={this.increasePlayerScore('team1', 'defender')}/>
          </View>
          <View style={styles.teamScoresContainer}>
            <Text style={styles.playerScore}>{this.props.team1AttackerScore}</Text>
            <Text style={styles.teamScore}>{this.props.team1Score}</Text>
            <Text style={styles.playerScore}>{this.props.team1DefenderScore}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.go}
                            disabled={!this.props.gameStartable}>
            <View style={[styles.roundButton, {backgroundColor: this.buttonColor(this.props.gameStartable, this.props.gameInProgress)}]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.teamContainer}>
          <View style={styles.teamScoresContainer}>
            <Text style={styles.playerScore}>{this.props.team2AttackerScore}</Text>
            <Text style={styles.teamScore}>{this.props.team2Score}</Text>
            <Text style={styles.playerScore}>{this.props.team2DefenderScore}</Text>
          </View>
          <View style={styles.teamPlayersContainer}>
            <PlayerView editable={playerEditable}
                        name={team2.defender.name}
                        role={'defender'}
                        onNameChange={this.updatePlayerName('team2', 'defender')}
                        onTap={this.increasePlayerScore('team2', 'defender')}/>
            <PlayerView editable={playerEditable}
                        name={team2.attacker.name}
                        role={'attacker'}
                        onNameChange={this.updatePlayerName('team2', 'attacker')}
                        onTap={this.increasePlayerScore('team2', 'attacker')}/>
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
    )
  },
  go() {
    this.props.startGame()
  },
  updatePlayerName(team, role) {
    const update = this.props.updatePlayerName
    return function(name) {
      update({
        team: team,
        role: role,
        name: name
      })
    }
  },
  increasePlayerScore(team, role) {
    const increase = this.props.increasePlayerScore
    return function() {
      increase({
        team: team,
        role: role
      })
    }
  }
})

const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 30,
    marginBottom: 30
  },
  teamPlayersContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  teamScoresContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundButton: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'green',
    alignSelf: 'center'
  },
  teamScore: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  playerScore: {
    color: '#999',
    fontSize: 24,
    marginLeft: 50,
    marginRight: 50
  }
})

function mapStateToProps(state) {
  return {
    gameInProgress: state.gameInProgress,
    team1: state.team1,
    team2: state.team2,
    team1Score: state.team1.attacker.score + state.team1.defender.score,
    team2Score: state.team2.attacker.score + state.team2.defender.score,
    team1AttackerScore: state.team1.attacker.score,
    team1DefenderScore: state.team1.defender.score,
    team2AttackerScore: state.team2.attacker.score,
    team2DefenderScore: state.team2.defender.score,
    gameStartable: state.team1.attacker.name.length > 0 &&
                    state.team1.defender.name.length > 0 &&
                    state.team2.attacker.name.length > 0 &&
                    state.team2.defender.name.length > 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => dispatch({type: START_GAME}),
    updatePlayerName: (params) => dispatch(Object.assign({type: UPDATE_PLAYER_NAME}, params)),
    increasePlayerScore: (params) => dispatch(Object.assign({type: INCREASE_PLAYER_SCORE}, params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchView)
