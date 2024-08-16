/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  getUpgradePotential,
  getUpgradeChance,
} from './evaluation';
import { getRelevantSubstatsOfArtifact } from './substats';

const testSandsRelevantSubstats_1 = {
  valuableSubstats: {
    critDMG_: 1,
  },
  impossibleSubstats: 2,
  wastedSubstats: 1,
  missingRollChances: [1, 0.5, 0.25, 0.125, 0.0625],
};
const testSandsRelevantSubstats_2 = {
  valuableSubstats: {
    critDMG_: 2,
    critRate_: 1,
    hp_: 2,
  },
  impossibleSubstats: 0,
  wastedSubstats: 3,
  missingRollChances: [0.75],
};

const testSands_2 = {
  artifactData: {
    location: 'Bennett',
    piece: 'sands',
    level: 20,
    rarity: 5,
    mainStatKey: 'enerRech_',
    substats: [
      { key: 'critDMG_', value: 14 },
      { key: 'def', value: 21 },
      { key: 'def_', value: 5 },
      { key: 'hp', value: 440 },
    ],
    substatCounts: {
      atk: 0,
      atk_: 0,
      critDMG_: 2,
      critRate_: 0,
      def: 1,
      def_: 1,
      eleMas: 0,
      enerRech_: 0,
      hp: 4,
      hp_: 0,
    },
  },
  buildEvaluations: [
    {
      artifactWearer: 'Bennett',
      buildOwner: 'Bennett',
      relevantSubstats: {
        valuableSubstats: {
          critDMG_: 2,
        },
        impossibleSubstats: 2,
        wastedSubstats: 5,
        missingRollChances: [],
      },
      assumedUsefulMissingSlots: 0,
      sortValue: 0,
      tier: 'S',
      upgradePotential: 0,
    },
  ],
};

test('gets correct upgradePotential case 1', () => {
  // should be 4 because max valuable rolls is 6
  // competing artifact only has 2 valuable rolls
  const upgradePotential = getUpgradePotential(
    testSandsRelevantSubstats_1,
    testSands_2,
    5,
  );
  expect(upgradePotential).toEqual(4);
});
test('gets correct upgradePotential case 2', () => {
  // should be 6 because 1 roll already went into critDMG_ the next can go into critRate_
  // 5 rolls are left in total, no competing artifact
  const upgradePotential = getUpgradePotential(
    testSandsRelevantSubstats_1,
    null,
    5,
  );
  expect(upgradePotential).toEqual(6);
});

test('gets correct upgradeChance case 1', () => {
  // should be index 1, because any upgrade after the first successful roll is an upgrade
  // index 1 is 0.5
  const upgradeChance = getUpgradeChance(
    4, // upgradePotential
    testSandsRelevantSubstats_1,
  );
  expect(upgradeChance).toEqual(0.5);
});
test('gets correct upgradeChance case 2', () => {
  // should be 1 because upgradePotential is 6, so all rolls are successful
  const upgradeChance = getUpgradeChance(
    1, // upgradePotential
    testSandsRelevantSubstats_2,
  );
  expect(upgradeChance).toEqual(0.75);
});
