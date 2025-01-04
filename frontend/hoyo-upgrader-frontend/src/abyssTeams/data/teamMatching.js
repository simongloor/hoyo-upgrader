/* eslint-disable import/prefer-default-export */

import paths from '../../data/paths';

export function getTeamMatchesForTeam(team, teams) {
  // return all teams that don't don't have an overlap of the used characters
  return teams.filter((otherTeam) => {
    if (team.id === otherTeam.id || team.id === 'new' || otherTeam.id === 'new') {
      return false;
    }
    return !team.characters.some((character) => otherTeam.characters.includes(character));
  });
}

export function getTeamMatchesForAllTeams(teams) {
  // return a list of all teams with their matches
  return teams.map((team) => ({
    team,
    matches: getTeamMatchesForTeam(team, teams),
  }));
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

export function getTeamMatchesForCharacters(teamMatches) {
  const tiers = ['S', 'A', 'B', 'C', 'D'];

  // count the number of matches for each character by tier
  // in the format [{ characterName, matchesByTier: { S, A, B, C, D } }]
  const matchesByCharacter = Object.keys(paths.character).map((characterName) => {
    const matchesByTier = {
      S: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };
    teamMatches.forEach((teamMatch) => {
      if (teamMatch.team.characters.includes(characterName)) {
        // console.log(
        //   `${characterName} is in team ${teamMatch.team.characters} and matches with`,
        //   teamMatch.matches,
        // );
        const teamTier = teamMatch.team.tier;
        teamMatch.matches.forEach((match) => {
          // count towards the lower tier of this team and the matched team
          const matchTier = match.tier;
          matchesByTier[
            tiers[Math.max(tiers.indexOf(teamTier), tiers.indexOf(matchTier))]
          ] += 1;
        });
      }
    });

    return { characterName, matchesByTier };
  });

  const relevantMatches = matchesByCharacter
    .filter((match) => Object.values(match.matchesByTier).some((count) => count > 0));

  return relevantMatches;
}
