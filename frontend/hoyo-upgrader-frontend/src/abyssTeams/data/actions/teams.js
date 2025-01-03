export function loadTeams() {
  return ({
    type: 'LOAD_TEAMS',
    payload: {
      exampleJsonData: {
        disabledCharacters: [],
        teams: [],
      },
    },
  });
}

export function toggleDisabledCharacter(characterName) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { characterName },
  });
}

// export function disableCharacter(characterName) {
//   return ({
//     type: 'DISABLE_CHARACTER',
//     payload: { characterName },
//   });
// }

// export function enableCharacter(characterName) {
//   return ({
//     type: 'ENABLE_CHARACTER',
//     payload: { characterName },
//   });
// }

export function addTeam(team) {
  return ({
    type: 'ADD_TEAM',
    payload: { team },
  });
}

export function removeTeam(team) {
  return ({
    type: 'REMOVE_TEAM',
    payload: { team },
  });
}

export function updateTeam(team) {
  return ({
    type: 'UPDATE_TEAM',
    payload: { team },
  });
}
