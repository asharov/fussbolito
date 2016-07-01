import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

const MatchView = React.createClass({
  render() {
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
    console.log('Boo!')
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

export default MatchView
