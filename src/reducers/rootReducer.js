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

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, { gameInProgress: true })
    default:
      return state
  }
}
