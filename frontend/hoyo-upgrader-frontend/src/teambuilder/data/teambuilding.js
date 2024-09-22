/* eslint-disable no-unused-vars */
// ---------------------------------------------------------
// utility

function getAllCharactersOfElements(characters, elements) {
  return characters
    .filter(({ element }) => elements.includes(element))
    .sort((a, b) => b.powerlevel - a.powerlevel);
}

function getEmptyTeams(numberOfTeams) {
  return Array(numberOfTeams).fill(null).map(() => [null, null, null, null]);
}

function getNextFreeSlot(team) {
  return team.findIndex((character) => character === null);
}

function deriveReactionFromTeam(team) {
}

// ---------------------------------------------------------
// building

function addOnfielderToTeams(characterPool, teams) {
  const t = [...teams];

  // add one highest powerlevel onfielder character to each team
  const onfielders = characterPool.filter(({ role }) => role === 'onfield');
  teams.forEach((team, index) => {
    const nextFreeSlot = getNextFreeSlot(team);
    t[index][nextFreeSlot] = onfielders.shift();
  });

  return { characterPool, teams };
}

function addMembersByDesire(desire, characterPool, teams) {
}

function addSustainToTeams(characterPool, teams) {
}

function addOfffieldersToTeams(characterPool, teams) {
}

function fillTeams(characterPool, teams) {
}

// ---------------------------------------------------------
// output

export default function buildTheaterTeams(characters, elements, numberOfTeams) {
  let build = {
    characterPool: getAllCharactersOfElements(characters, elements),
    teams: getEmptyTeams(numberOfTeams),
    teamReactions: [],
  };

  build = addOnfielderToTeams(...build);
  build = addMembersByDesire('needs', ...build);
  build = addMembersByDesire('likes', ...build);
  build = addSustainToTeams(...build);
  build = addOfffieldersToTeams(...build);
  build = fillTeams(...build);

  return {
    teams: build.teams,
    unusedCharacters: build.characterPool,
  };
}
