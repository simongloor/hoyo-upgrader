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

export const possibleStats = {
  substat: ['critRate_', 'critDMG_', 'enerRech_', 'atk_', 'hp_', 'def_', 'eleMas'],
  sands: ['enerRech_', 'atk_', 'hp_', 'def_', 'eleMas'],
  goblet: ['atk_', 'hp_', 'def_', 'eleMas', 'electro_dmg_', 'pyro_dmg_', 'cryo_dmg_', 'hydro_dmg_', 'anemo_dmg_', 'geo_dmg_', 'dendro_dmg_', 'physical_dmg_'],
  gobletPrimary: ['atk_', 'hp_', 'def_', 'eleMas'],
  gobletDmg: ['electro_dmg_', 'pyro_dmg_', 'cryo_dmg_', 'hydro_dmg_', 'anemo_dmg_', 'geo_dmg_', 'dendro_dmg_', 'physical_dmg_'],
  circlet: ['critRate_', 'critDMG_', 'atk_', 'hp_', 'def_', 'eleMas', 'heal_'],
};

//---------------------------------------------------------
// initial data processing

export function countSubstats(artifactData) {
  const foundSubstats = { ...emptySubstats };

  // How many valuable rolls?
  artifactData.substats.forEach((substat) => {
    const { key, value } = substat;
    if (Object.prototype.hasOwnProperty.call(possibleRolls.averages, key)) {
      const foundRolls = Math.round(value / possibleRolls.averages[key]);
      foundSubstats[key] = foundRolls;
    }
  });

  return foundSubstats;
}

//---------------------------------------------------------
// data processing for displaying a single artifact

function getValuableSubstats(substats, characterBuild) {
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

function getWastedSubstats(artifactData, totalValuableSubstats, impossibleSubstats) {
  const { rarity, level } = artifactData;
  const possibleStartRolls = rarity === 5 ? 4 : 3;
  const possibleRollsAtLevel = Math.floor(level / 4) + possibleStartRolls;
  const impossibleSubstatsAtLevel = Math.min(impossibleSubstats, possibleRollsAtLevel);
  const wastedSubstats = possibleRollsAtLevel - totalValuableSubstats - impossibleSubstatsAtLevel;

  // 3* artifacts with few valuable substats can have negative wasted substats
  return Math.max(0, wastedSubstats);
}

function getUselessSubstatSlots(artifactData, characterBuild) {
  // Number of slots (max 4) that don't have a valuable substat
  // The slots can't roll into the mainstat
  // Some characters can have more than 4 valuable substat types
  const valuableSubstatTypes = characterBuild.substats;
  const substatUsedByMainstat = valuableSubstatTypes.includes(artifactData.mainStatKey);
  return Math.max(0, 4 - valuableSubstatTypes.length + (substatUsedByMainstat ? 1 : 0));
}

function getWastedSubstatSlots(artifactData, characterBuild) {
  // Number of slots have rolled into a useless substat type
  return artifactData.substats.reduce((acc, substat) => {
    if (!characterBuild.substats.includes(substat.key)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

function getImpossibleSubstats(uselessSubstatSlots, maxRolls) {
  const hasUsefulSubstats = uselessSubstatSlots < 4;
  // console.log('hasUsefulSubstats', hasUsefulSubstats);
  return hasUsefulSubstats ? uselessSubstatSlots : maxRolls;
}

function getMissingRollChances(missingRolls, wastedSubstatSlots) {
  // The chance for missing rolls depends on the number of valuable substat types
  const missingRollChances = {
    missingRolls100: 0,
    missingRolls75: 0,
    missingRolls50: 0,
    missingRolls25: 0,
    missingRolls00: 0,
  };

  switch (wastedSubstatSlots) {
    case 0: {
      missingRollChances.missingRolls100 = missingRolls;
      break;
    }
    case 1: {
      missingRollChances.missingRolls75 = missingRolls;
      break;
    }
    case 2: {
      missingRollChances.missingRolls50 = missingRolls;
      break;
    }
    case 3: {
      missingRollChances.missingRolls25 = missingRolls;
      break;
    }
    case 4: {
      missingRollChances.missingRolls00 = missingRolls;
      break;
    }
    default: {
      break;
    }
  }

  return missingRollChances;
}

export function evaluateArtifact(artifactData, characterBuild) {
  // console.log(artifactData, characterBuild);
  if (!artifactData) return {};

  const maxRolls = artifactData.rarity === 5 ? 9 : 7;

  const uselessSubstatSlots = getUselessSubstatSlots(artifactData, characterBuild);
  const impossibleSubstats = getImpossibleSubstats(uselessSubstatSlots, maxRolls);

  const valuableSubstats = getValuableSubstats(
    artifactData.substatCounts,
    characterBuild,
  );

  let wastedSubstats = getWastedSubstats(
    artifactData,
    valuableSubstats.total,
    impossibleSubstats,
  );

  let missingRolls = maxRolls - valuableSubstats.total - impossibleSubstats - wastedSubstats;
  if (missingRolls < 0) {
    console.log('Warning: missing rolls is negative', maxRolls, valuableSubstats.total, impossibleSubstats, wastedSubstats, artifactData);
    missingRolls = 0;
  }

  const wastedSubstatSlots = getWastedSubstatSlots(artifactData, characterBuild);
  const missingRollChances = getMissingRollChances(missingRolls, wastedSubstatSlots);
  wastedSubstats += missingRollChances.missingRolls00;
  delete missingRollChances.missingRolls00;

  // return a flat object ready for display
  return {
    ...valuableSubstats.rolls,
    impossibleSubstats,
    wastedSubstats,
    ...missingRollChances,
  };
}

//---------------------------------------------------------
// build quality analysis

export function getArtifactTier(artifactData, evaluatedArtifactStats) {
  switch (artifactData.slotKey) {
    case 'flower':
    case 'plume': {
      if (evaluatedArtifactStats.wastedSubstats <= 1) {
        return 'S';
      }
      if (evaluatedArtifactStats.wastedSubstats <= 2) {
        return 'A';
      }
      if (evaluatedArtifactStats.wastedSubstats <= 4) {
        return 'B';
      }
      return 'C';
    }
    case 'sands':
    case 'goblet':
    case 'circlet': {
      if (evaluatedArtifactStats.wastedSubstats <= 2) {
        return 'S';
      }
      if (evaluatedArtifactStats.wastedSubstats <= 4) {
        return 'A';
      }
      return 'B';
    }
    default: {
      return '?';
    }
  }
}

export function getBuildQualitySortValue(build, totalSubstats, filteredCharacterName) {
  // wasted substats is the biggest factor
  let sortValue = totalSubstats.wastedSubstats;

  // filtered character build is pushed to be the first build in the list
  if (filteredCharacterName && build.characterName === filteredCharacterName) {
    sortValue -= 100;
  }

  // artifacts that don't have valuable substats go to the bottom
  if (totalSubstats.impossibleSubstats >= 8) {
    return 10;
  }

  // add chance as decimal
  const {
    missingRolls100,
    missingRolls75,
    missingRolls50,
    missingRolls25,
    missingRolls00,
  } = totalSubstats;

  if (missingRolls100 > 0) {
    sortValue -= 0.998;
  } else if (missingRolls75 > 0) {
    sortValue -= 0.75 ** missingRolls75;
  } else if (missingRolls50 > 0) {
    sortValue -= 0.5 ** missingRolls50;
  } else if (missingRolls25 > 0) {
    sortValue -= 0.25 ** missingRolls25;
  } else if (missingRolls00 > 0) {
    sortValue -= 0.00001;
  } else {
    sortValue -= 1;
  }

  return sortValue;
}

export function getArtifactQualitySortValue(artifactEvaluation, filteredCharacter) {
  // artifacts without builds go to the bottom
  if (artifactEvaluation.buildEvaluations.length === 0) {
    return 20;
  }

  return artifactEvaluation.buildEvaluations[0].sortValue;
}

//---------------------------------------------------------
// data processing for global reference data

export function evaluateEquippedArtifacts(artifactsByCharacter, characters) {
  const evaluations = {};
  Object.keys(artifactsByCharacter).forEach((characterName) => {
    evaluations[characterName] = [];
    characters[characterName].forEach((build, iBuild) => {
      evaluations[characterName][iBuild] = {};
      Object.keys(artifactsByCharacter[characterName]).forEach((slot) => {
        // console.log(characterName, iBuild, slot);
        evaluations[characterName][iBuild][slot] = evaluateArtifact(
          artifactsByCharacter[characterName][slot],
          build,
        );
      });
    });
  });
  // console.log(evaluations);
  return evaluations;
}

//---------------------------------------------------------
// data processing for displaying multiple artifacts

export function combineEvaluatedSubstats(evaluatedArtifactStats) {
  const foundSubstats = {};
  // Accumulate all values of the artifacts
  evaluatedArtifactStats.forEach((artifact) => {
    // Add the valuable substats
    Object.keys(artifact).forEach((key) => {
      if (key in foundSubstats) {
        foundSubstats[key] += artifact[key];
      } else {
        foundSubstats[key] = artifact[key];
      }
    });
  });
  return foundSubstats;
}

export function evaluateArtifactSet(equippedEvaluations, characterName, buildIndex) {
  if (
    equippedEvaluations
    && equippedEvaluations[characterName]
    && equippedEvaluations[characterName][buildIndex]
  ) {
    return combineEvaluatedSubstats([
      equippedEvaluations[characterName][buildIndex].flower,
      equippedEvaluations[characterName][buildIndex].plume,
      equippedEvaluations[characterName][buildIndex].sands,
      equippedEvaluations[characterName][buildIndex].goblet,
      equippedEvaluations[characterName][buildIndex].circlet,
    ]);
  }
  return [];
}

export function getSubstatIsAlwaysBad(substat) {
  return substat === 'hp' || substat === 'def' || substat === 'atk';
}
