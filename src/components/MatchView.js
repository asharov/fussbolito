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
          <PlayerView editable={playerEditable}
                      name={team1.attacker.name}
                      onNameChange={this.updatePlayerName('team1', 'attacker')}
                      onTap={this.increasePlayerScore('team1', 'attacker')}/>
          <Text style={styles.teamScore}>{this.props.team1Score}</Text>
          <PlayerView editable={playerEditable}
                      name={team1.defender.name}
                      onNameChange={this.updatePlayerName('team1', 'defender')}
                      onTap={this.increasePlayerScore('team1', 'defender')}/>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.go}
                            disabled={!this.props.gameStartable}>
            <View style={[styles.roundButton, {backgroundColor: this.buttonColor(this.props.gameStartable, this.props.gameInProgress)}]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.teamContainer}>
          <PlayerView editable={playerEditable}
                      name={team2.attacker.name}
                      onNameChange={this.updatePlayerName('team2', 'attacker')}
                      onTap={this.increasePlayerScore('team2', 'attacker')}/>
          <Text style={styles.teamScore}>{this.props.team2Score}</Text>
          <PlayerView editable={playerEditable}
                      name={team2.defender.name}
                      onNameChange={this.updatePlayerName('team2', 'defender')}
                      onTap={this.increasePlayerScore('team2', 'defender')}/>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  roundButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: 'green',
    alignSelf: 'center'
  },
  teamScore: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

function mapStateToProps(state) {
  return {
    gameInProgress: state.gameInProgress,
    team1: state.team1,
    team2: state.team2,
    team1Score: state.team1.attacker.score + state.team1.defender.score,
    team2Score: state.team2.attacker.score + state.team2.defender.score,
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
