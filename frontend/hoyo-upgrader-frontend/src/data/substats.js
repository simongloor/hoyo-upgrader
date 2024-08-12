/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import paths from './paths';

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

function evaluateSubstatSlots(artifactData, characterBuild) {
  let notUsableByBuild = 0;
  let notRollable = 0;
  let rollableValuable = 0;

  // split up the theoretically possible rolls for the build
  // into valuable and useless slots for this artifact type
  let maxValuableStats = characterBuild.substats.length;
  if (characterBuild.substats.includes(artifactData.mainStatKey)) {
    maxValuableStats -= 1;
  }
  const maxValuableSlots = Math.min(maxValuableStats, 4); // can't have more than 4 substats
  notUsableByBuild = 4 - maxValuableSlots;

  // split up the 4 slots depending on how they rolled into valuable, usless and unknown slots
  const valuableSlotRolls = artifactData.substats.reduce((acc, substat) => {
    if (characterBuild.substats.includes(substat.key)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const unknownSlotRolls = 4 - artifactData.substats.length;
  const uselessSlotRolls = 4 - valuableSlotRolls - unknownSlotRolls;

  const rollableUseful = Math.min(
    maxValuableStats - valuableSlotRolls, // are there any valuable substats left?
    unknownSlotRolls, // are there any unknown slots left?
  );

  rollableValuable = valuableSlotRolls + rollableUseful;
  notRollable = uselessSlotRolls + (unknownSlotRolls - rollableUseful);

  return {
    notUsableByBuild,
    notRollable,
    rollableValuable,
  };
}

function getImpossibleSubstats(uselessSubstatSlots, maxRolls) {
  const hasUsefulSubstats = uselessSubstatSlots < 4;
  // console.log('hasUsefulSubstats', hasUsefulSubstats);
  return hasUsefulSubstats ? uselessSubstatSlots : maxRolls;
}

function getMissingRollChances(
  missingRolls,
  uselessSubstatSlots,
) {
  let baseRollChance = 1;
  switch (uselessSubstatSlots) {
    case 1: {
      baseRollChance = 0.75;
      break;
    }
    case 2: {
      baseRollChance = 0.5;
      break;
    }
    case 3: {
      baseRollChance = 0.25;
      break;
    }
    case 4: {
      baseRollChance = 0;
      break;
    }
    case 0:
    default: {
      break;
    }
  }

  // The chance decreases every roll
  return Array(missingRolls).fill(0).map((_, i) => baseRollChance ** (i + 1), []);
}

export function getRelevantSubstatsOfArtifact(artifactData, characterBuild) {
  // console.log(artifactData, characterBuild);
  if (!artifactData) {
    return {
      valuableSubstats: {},
      impossibleSubstats: 0,
      wastedSubstats: 0,
      missingRollChances: [],
    };
  }

  const maxRolls = artifactData.rarity === 5 ? 9 : 7;

  const SlotEvaluation = evaluateSubstatSlots(artifactData, characterBuild);
  const impossibleSubstats = getImpossibleSubstats(SlotEvaluation.notUsableByBuild, maxRolls);

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

  const missingRollChances = getMissingRollChances(missingRolls, SlotEvaluation.notRollable);
  wastedSubstats += missingRollChances.filter((chance) => chance === 0).length;

  // return a flat object ready for display
  return {
    relevantSubstats: {
      valuableSubstats: { ...valuableSubstats.rolls },
      impossibleSubstats,
      wastedSubstats,
      missingRollChances,
    },
    assumedUsefulMissingSlots: SlotEvaluation.rollableValuable,
  };
}

//---------------------------------------------------------
// data processing for displaying multiple artifacts

export function combineRelevantSubstats(relevantSubstats) {
  // console.log(relevantSubstats);
  const foundSubstats = {
    valuableSubstats: {},
    impossibleSubstats: 0,
    wastedSubstats: 0,
    missingRollChances: [],
  };
  // Accumulate all values of the artifacts
  relevantSubstats.forEach((artifact) => {
    if (!artifact) return;
    // Add the valuable substats
    Object.keys(artifact.valuableSubstats).forEach((key) => {
      if (key in foundSubstats.valuableSubstats) {
        // console.log('existing stat category', key);
        foundSubstats.valuableSubstats[key] += artifact.valuableSubstats[key];
      } else {
        // console.log('new stat category', key);
        foundSubstats.valuableSubstats[key] = artifact.valuableSubstats[key];
      }
    });
    // console.log('foundSubstats', foundSubstats);

    // Add the impossible substats
    foundSubstats.impossibleSubstats += artifact.impossibleSubstats;

    // Add the missing roll chances
    foundSubstats.missingRollChances = foundSubstats.missingRollChances
      .concat(artifact.missingRollChances);

    // Add the wasted substats
    foundSubstats.wastedSubstats += artifact.wastedSubstats;
  });
  return foundSubstats;
}

export function getCharactersTotalSubstats(artifactWearer, artifactsBySlot) {
  // console.log(artifactsBySlot);
  return combineRelevantSubstats(
    Object.keys(paths.piece).map((slot) => {
      if (!artifactsBySlot[slot]) return null;

      const build = artifactsBySlot[slot].buildEvaluations
        .find((evaluation) => evaluation.artifactWearer === artifactWearer);
      // if (!build) return null;
      return build.relevantSubstats;
    }),
  );
}

export function getSubstatIsAlwaysBad(substat) {
  return substat === 'hp' || substat === 'def' || substat === 'atk';
}
