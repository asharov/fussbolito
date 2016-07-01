/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MatchView from './src/components/MatchView'

class Fussbolito extends Component {
  render() {
    return (
      <MatchView/>
    );
  }
}

AppRegistry.registerComponent('Fussbolito', () => Fussbolito);
