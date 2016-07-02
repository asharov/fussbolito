/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {Provider} from 'react-redux'

import store from './src/store'
import RootView from './src/components/RootView'

const Fussbolito = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <RootView />
      </Provider>
    );
  }
})

AppRegistry.registerComponent('Fussbolito', () => Fussbolito);
