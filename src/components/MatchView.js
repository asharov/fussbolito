import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { START_GAME } from './../reducers/rootReducer'

const MatchView = React.createClass({
  propTypes: {
    gameInProgress: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired
  },

  render() {
    console.log(this.props.gameInProgress)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput style={styles.playerInput}/>
          <TextInput style={styles.playerInput}/>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={this.go}>
            <View style={styles.roundButton}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput style={styles.playerInput}/>
          <TextInput style={styles.playerInput}/>
        </View>
      </View>
    )
  },
  go() {
    this.props.startGame()
  }
})

const styles = StyleSheet.create({
  playerInput: {
    flex: 1,
    borderColor: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 5,
    margin: 30,
    height: 30
  },
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
    gameInProgress: state.gameInProgress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => dispatch({type: START_GAME})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchView)
