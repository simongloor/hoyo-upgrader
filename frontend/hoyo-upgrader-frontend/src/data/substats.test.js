/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { getRelevantSubstatsOfArtifact } from './substats';

const testSands_1 = {
  piece: 'sands',
  level: 0,
  rarity: 5,
  mainStatKey: 'enerRech_',
  substats: [
    { key: 'atk_', value: 4 },
    { key: 'critDMG_', value: 5 },
    { key: 'eleMas', value: 16 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 1,
    critDMG_: 1,
    critRate_: 0,
    def: 0,
    def_: 0,
    eleMas: 1,
    enerRech_: 0,
    hp: 0,
    hp_: 0,
  },
};
const testSands_2 = {
  piece: 'sands',
  level: 0,
  rarity: 4,
  mainStatKey: 'enerRech_',
  substats: [
    { key: 'atk_', value: 4 },
    { key: 'eleMas', value: 21 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 1,
    critDMG_: 0,
    critRate_: 0,
    def: 0,
    def_: 0,
    eleMas: 1,
    enerRech_: 0,
    hp: 0,
    hp_: 0,
  },
};
const testPlume_1 = {
  piece: 'plume',
  level: 0,
  rarity: 4,
  mainStatKey: 'atk',
  substats: [
    { key: 'enerRech_', value: 5.2 },
    { key: 'hp_', value: 4.7 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 0,
    def_: 0,
    eleMas: 0,
    enerRech_: 1,
    hp: 0,
    hp_: 1,
  },
};
const testBuild_1 = { substats: ['enerRech_', 'critRate_', 'critDMG_'] };
const testBuild_2 = { substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'] };
const testBuild_3 = { substats: ['enerRech_', 'critRate_', 'hp_'] };

test('gets correct impossibleSubstats case 1', () => {
  // should be 2 because only critRate_ and critDMG_ are possible on sands
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  expect(relevantSubstats.impossibleSubstats).toEqual(2);
});
test('gets correct impossibleSubstats case 2', () => {
  // should be 0 because 4 stats are possible on sands, only enerRech_ is used by mainstat
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_2);
  expect(relevantSubstats.impossibleSubstats).toEqual(0);
});

test('gets correct wastedSubstats case 1', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 1 because 2 substats are impossible and 3 substats are bad (def, def, empty slot)
  expect(relevantSubstats.wastedSubstats).toEqual(1);
});
test('gets correct wastedSubstats case 2', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_2);
  // should be 1 because 0 substats are impossible and 1 initial roll is missing
  expect(relevantSubstats.wastedSubstats).toEqual(1);
});

test('gets correct number of missing substats case 1', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 5 because level 0 allows for 5 more rolls
  expect(relevantSubstats.missingRollChances.length).toEqual(5);
});
test('gets correct number of missing substats case 2', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_2);
  // should be 5 because level 0 allows for 5 more rolls
  expect(relevantSubstats.missingRollChances.length).toEqual(5);
});

test('gets correct assumedUsefulMissingSlots case 1', () => {
  const { assumedUsefulMissingSlots } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 1 because the last slot could roll into critRate_
  expect(assumedUsefulMissingSlots).toEqual(1);
});
test('gets correct assumedUsefulMissingSlots case 2', () => {
  const { assumedUsefulMissingSlots } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_2);
  // should be 1 because the last slot could roll into critRate_
  expect(assumedUsefulMissingSlots).toEqual(1);
});

test('gets correct missingRollChances case 1', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 1 because the last slot could roll into critRate_
  expect(relevantSubstats.missingRollChances[0]).toEqual(1.0);
});
test('gets correct missingRollChances case 2', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 0.5 because the 2nd roll could either be critRate_ or critDMG_
  expect(relevantSubstats.missingRollChances[1]).toEqual(0.5);
});
test('gets correct missingRollChances case 3', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_2, testBuild_1);
  // should be 1 because the 1st + 2nd rolls could go into critRate_ and critDMG_
  expect(relevantSubstats.missingRollChances[1]).toEqual(1.0);
});
test('gets correct missingRollChances case 4', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_2, testBuild_1);
  // should be 0.5 because the 3rd roll could go into critRate_ or critDMG_
  expect(relevantSubstats.missingRollChances[2]).toEqual(0.5);
});
test('gets correct missingRollChances case 5', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 1 because the 1th roll could go into critRate_
  expect(relevantSubstats.missingRollChances[0]).toEqual(1.0);
});
test('gets correct missingRollChances case 6', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 0 because the 2nd roll can't roll into anything useful
  expect(relevantSubstats.missingRollChances[1]).toEqual(0.0);
});
test('gets correct missingRollChances case 7', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 0.75 because the 3rd roll can roll into three valuable substats
  expect(relevantSubstats.missingRollChances[2]).toEqual(0.75);
});
