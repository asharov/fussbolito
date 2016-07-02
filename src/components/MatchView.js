import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { START_GAME } from './../reducers/rootReducer'
import PlayerView from './PlayerView'

const MatchView = React.createClass({
  propTypes: {
    gameInProgress: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired
  },

  buttonColor(gameInProgress) {
    return gameInProgress ? 'red' : 'green'
  },
  render() {
    console.log(this.props)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <PlayerView/>
          <PlayerView/>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.go}>
            <View style={[styles.roundButton, {backgroundColor: this.buttonColor(this.props.gameInProgress)}]}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <PlayerView/>
          <PlayerView/>
        </View>
      </View>
    )
  },
  go() {
    this.props.startGame({
      team1: {
        attackerName: 'A1',
        defenderName: 'D1'
      },
      team2: {
        attackerName: 'A2',
        defenderName: 'D2'
      }
    })
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
    startGame: (params) => dispatch(Object.assign({type: START_GAME}, params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchView)
