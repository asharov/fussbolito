import { combineReducers } from 'redux'

function initialPlayerState() {
    return {
      name: '',
      score: 0
    }
}

function initialTeamState() {
  return {
    attacker: initialPlayerState(),
    defender: initialPlayerState()
  }
}

const initialState = {
  gameInProgress: false,
  team1: initialTeamState(),
  team2: initialTeamState()
}

export const START_GAME = "START_GAME"

function gameInProgressReducer(state = initialState.gameInProgress, action) {
  switch (action.type) {
    case START_GAME:
      return true
    default:
      return state
  }
}

function teamReducer(teamAttr) {
  return function(state = initialState[teamAttr], action) {
    switch (action.type) {
      case START_GAME:
        return {
          attacker: Object.assign({}, state.attacker, { name: action[teamAttr].attackerName }),
          defender: Object.assign({}, state.defender, { name: action[teamAttr].defenderName })
        }
      default:
        return state
    }
  }
}

export default combineReducers({
  gameInProgress: gameInProgressReducer,
  team1: teamReducer('team1'),
  team2: teamReducer('team2')
})
