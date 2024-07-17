/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

//---------------------------------------------------------
// data

const emptySubstats = {
  // potential
  enerRech_: 0,
  critDMG_: 0,
  critRate_: 0,
  eleMas: 0,
  atk_: 0,
  def_: 0,
  hp_: 0,
  // useless
  atk: 0,
  def: 0,
  hp: 0,
};

const possibleRolls = {
  options: {
    enerRech_: [4.5, 5.2, 5.8, 6.5],
    critDMG_: [5.4, 6.2, 7, 7.8],
    critRate_: [2.7, 3.1, 3.5, 3.9],
    eleMas: [16, 19, 21, 23],
    atk_: [4.1, 4.7, 5.3, 5.8],
    def_: [5.1, 5.8, 6.6, 7.3],
    hp_: [4.1, 4.7, 5.3, 5.8],
    atk: [16, 19, 21, 23],
    def: [19, 23, 26, 29],
    hp: [239, 287, 323, 359],
  },
  averages: {
    enerRech_: 5.5,
    critDMG_: 6.6,
    critRate_: 3.3,
    eleMas: 19.75,
    atk_: 5.2,
    def_: 6.2,
    hp_: 5.2,
    atk: 19.75,
    def: 23.25,
    hp: 287,
  },
};

//---------------------------------------------------------
// initial data processing

export function countSubstats(artifactData) {
  const foundSubstats = { ...emptySubstats };

  // How many valuable rolls?
  artifactData.substats.forEach((substat) => {
    const { key, value } = substat;
    if (!Object.prototype.hasOwnProperty.call(possibleRolls.averages, key)) {
      const foundRolls = Math.round(value / possibleRolls.averages[key]);
      foundSubstats[key] = foundRolls;
    }
  });

  return foundSubstats;
}

//---------------------------------------------------------
// data processing for displaying a single artifact

export function getValuableSubstats(substats, characterBuild) {
  const valuableSubstatTypes = characterBuild.substats;
  const valuableArtifactSubstats = {
    total: 0,
    rolls: {},
  };
  valuableSubstatTypes.forEach((substat) => {
    valuableArtifactSubstats.rolls[substat] = substats[substat];
    valuableArtifactSubstats.total += substats[substat];
  });
  return valuableArtifactSubstats;
}

export function getImpossibleSubstats(artifactData, characterBuild) {
  // Number of slots (max 4) that don't have a valuable substat
  // The slots can't roll into the mainstat
  const valuableSubstatTypes = characterBuild.substats;
  return 4 - valuableSubstatTypes.length + (artifactData.mainStat in valuableSubstatTypes ? 1 : 0);
}

export function evaluateArtifact(artifactData, characterBuild) {
  const valuableSubstats = getValuableSubstats(artifactData.substats, characterBuild);
  const impossibleSubstats = getImpossibleSubstats(artifactData, characterBuild);
  const maxRolls = artifactData.rarity === 5 ? 9 : 8;
  const wastedSubstats = maxRolls - impossibleSubstats - valuableSubstats.total;
  return {
    ...artifactData,
    valuableSubstats,
    impossibleSubstats,
    maxRolls,
    wastedSubstats,
  };
}

export function getArtifactTier(artifactData, valuableSubstats) {
  switch (artifactData.slotKey) {
    case 'flower':
    case 'plume': {
      return '';
    }
    case 'sands':
    case 'goblet':
    case 'circlet': {
      return '';
    }
    default: {
      return '';
    }
  }
}

//---------------------------------------------------------
// data processing for displaying multiple artifacts

export function combineSubstats(characterData) {
  console.log(characterData);
  const foundSubstats = {};
  // Accumulate all values of the substats
  Object.keys(foundSubstats).forEach((key) => {
    foundSubstats[key] = characterData.flower.substats[key]
      + characterData.plume.substats[key]
      + characterData.sands.substats[key]
      + characterData.goblet.substats[key]
      + characterData.circlet.substats[key];
  });
  return foundSubstats;
}

export function evaluateArtifactSet(characterArtifacts, characterBuild) {
  // go through keys of characterArtifacts
  const artifactSubstats = {};
  Object.keys(characterArtifacts).forEach((key) => {
    // artifactSubstats[key] = evaluateArtifact(characterArtifacts[key], characterBuild);
  });

  return combineSubstats(artifactSubstats);
}
