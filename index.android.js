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
import {Provider} from 'react-redux'

import MatchView from './src/components/MatchView'
import store from './src/store'

class Fussbolito extends Component {
  render() {
    return (
      <Provider store={store}>
        <MatchView/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Fussbolito', () => Fussbolito);
