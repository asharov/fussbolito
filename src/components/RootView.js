import React from 'react'

import {
  Image
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator'
import MatchView from './MatchView'
import RankingView from './RankingView'

const RootView = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'match'
    }
  },

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'match'}
          title="Match"
          renderIcon={() => <Image source={require('../images/stadium.png')} />}
          onPress={() => this.setState({ selectedTab: 'match' })}>
          <MatchView/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ranking'}
          title="Ranking"
          renderIcon={() => <Image source={require('../images/trophy.png')} />}
          onPress={() => this.setState({ selectedTab: 'ranking' })}>
          <RankingView/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
})

export default RootView
