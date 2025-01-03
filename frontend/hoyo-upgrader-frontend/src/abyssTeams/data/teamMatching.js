/* eslint-disable import/prefer-default-export */

export function getAllTeamMatches(team, teams) {
  // return all teams that don't don't have an overlap of the used characters
  return teams.filter((otherTeam) => {
    if (team.id === otherTeam.id) {
      return false;
    }
    return !team.characters.some((character) => otherTeam.characters.includes(character));
  });
}

export function getCharactersByTier(teams) {
  // return a list in the format [{ tier, character }] sorted by tier
  // each character should only appear once in the list

  const tiers = ['S', 'A', 'B', 'C', 'D'];
  const charactersWithTiers = [];

  // fill the charactersByTier list
  tiers.forEach((tier) => {
    teams.forEach((team) => {
      if (team.tier === tier) {
        team.characters.forEach((character) => {
          if (!charactersWithTiers.some((char) => char.character === character)) {
            charactersWithTiers.push({ tier, character });
          }
        });
      }
    });
  });

  return charactersWithTiers;
}
