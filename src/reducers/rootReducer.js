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
export const UPDATE_PLAYER_NAME = "UPDATE_PLAYER_NAME"

function gameInProgressReducer(state = initialState.gameInProgress, action) {
  switch (action.type) {
    case START_GAME:
      return true
    default:
      return state
  }
}

function playerReducer(teamAttr, playerAttr) {
  return function(state = initialState[teamAttr][playerAttr], action) {
    switch (action.type) {
      case UPDATE_PLAYER_NAME:
        if (action[teamAttr] && action[teamAttr][playerAttr]) {
          return Object.assign({}, state, { name: action[teamAttr][playerAttr].name})
        } else {
          return state
        }
      default:
        return state
    }
  }
}

export default combineReducers({
  gameInProgress: gameInProgressReducer,
  team1: combineReducers({
    attacker: playerReducer('team1', 'attacker'),
    defender: playerReducer('team1', 'defender')
  }),
  team2: combineReducers({
    attacker: playerReducer('team2', 'attacker'),
    defender: playerReducer('team2', 'defender')
  })
})
