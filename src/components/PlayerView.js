import React from 'react'
import {
  TextInput,
  StyleSheet
} from 'react-native'

const PlayerView = React.createClass({
  render() {
    return (
      <TextInput style={styles.playerInput}
                autoCorrect={false}/>
    )
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
  }
})

export default PlayerView
