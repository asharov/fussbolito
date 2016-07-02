import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  ListView,
  View,
  Text
} from 'react-native'

const RankingView = React.createClass({
  getInitialState() {
    return {
      ranking: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
        .cloneWithRows(this.props.ranking)
    }
  },
  componentWillReceiveProps(props) {
    if (props.ranking !== this.props.ranking) {
      this.state = {
        ranking: this.state.ranking.cloneWithRows(props.ranking)
      }
    }
  },
  renderRow(item) {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>{item.name}</Text>
        <Text>{item.score}</Text>
      </View>
    )
  },
  render() {
    return (
      <ListView dataSource={this.state.ranking}
                renderRow={this.renderRow}/>
    )
  }
})

function mapStateToProps(state) {
  function addToScoreMap(player, won, scoreMap) {
    if (!scoreMap[player.name]) {
      scoreMap[player.name] = {
        played: 0,
        won: 0
      }
    }
    scoreMap[player.name].played += 1
    scoreMap[player.name].won += won
  }
  let scoreMap = {}
  for (playedGame of state.playedGames) {
    let team1Win = playedGame.team1.attacker.score + playedGame.team1.defender.score >
                  playedGame.team2.attacker.score + playedGame.team2.defender.score
    addToScoreMap(playedGame.team1.attacker, team1Win, scoreMap)
    addToScoreMap(playedGame.team1.defender, team1Win, scoreMap)
    addToScoreMap(playedGame.team2.attacker, !team1Win, scoreMap)
    addToScoreMap(playedGame.team2.defender, !team1Win, scoreMap)
  }
  let scoreList = []
  for (let name in scoreMap) {
    if (scoreMap.hasOwnProperty(name)) {
      scoreList.push({
        name: name,
        score: '' + Math.round(100 * scoreMap[name].won / scoreMap[name].played) + ' %'
      })
    }
  }
  return {
    ranking: scoreList
  }
}

export default connect(mapStateToProps)(RankingView)
