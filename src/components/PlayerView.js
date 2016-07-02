import React, { PropTypes } from 'react'
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const PlayerView = React.createClass({
  propTypes: {
    editable: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onTap: PropTypes.func.isRequired
  },

  render() {
    if (this.props.editable) {
      return (
        <TextInput style={[styles.player, styles.input]}
                  autoCorrect={false}
                  onChangeText={this.props.onNameChange}
                  value={this.props.name}/>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.player, styles.button]}  onPress={this.props.onTap}>
          <Text style={styles.text}>{this.props.name}</Text>
        </TouchableOpacity>
      )
    }
  }
})

const styles = StyleSheet.create({
  player: {
    flex: 1,
    borderColor: 'black',
    alignSelf: 'center',
    margin: 30,
    height: 50,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 5,
    fontSize: 50
  },
  text: {
    textAlign: 'center',
    fontSize: 50
  },
  button: {
    backgroundColor: '#ccc'
  }
})

export default PlayerView
