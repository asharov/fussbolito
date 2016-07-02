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
        <TouchableOpacity style={styles.player} onPress={this.props.onTap}>
          <Text>{this.props.name}</Text>
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
    height: 30
  },
  input: {
    borderWidth: 1,
    padding: 5,
  }
})

export default PlayerView
