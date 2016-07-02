import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
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

  buttonColor(gameInProgress) {
    return gameInProgress ? 'red' : 'green'
  },
  render() {
    console.log(this.props)
    const playerEditable = !this.props.gameInProgress
    const team1 = this.props.team1
    const team2 = this.props.team2
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <PlayerView editable={playerEditable}
                      name={team1.attacker.name}
                      onNameChange={this.updatePlayerName('team1', 'attacker')}
                      onTap={this.increasePlayerScore('team1', 'attacker')}/>
          <PlayerView editable={playerEditable}
                      name={team1.defender.name}
                      onNameChange={this.updatePlayerName('team1', 'defender')}
                      onTap={this.increasePlayerScore('team1', 'defender')}/>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.go}>
            <View style={[styles.roundButton, {backgroundColor: this.buttonColor(this.props.gameInProgress)}]}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <PlayerView editable={playerEditable}
                      name={team2.attacker.name}
                      onNameChange={this.updatePlayerName('team2', 'attacker')}
                      onTap={this.increasePlayerScore('team2', 'attacker')}/>
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
  roundButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: 'green',
    alignSelf: 'center'
  }
})

function mapStateToProps(state) {
  return {
    gameInProgress: state.gameInProgress,
    team1: state.team1,
    team2: state.team2
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
