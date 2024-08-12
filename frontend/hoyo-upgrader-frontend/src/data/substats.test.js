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
const testBuild_1 = { substats: ['enerRech_', 'critRate_', 'critDMG_'] };
const testBuild_2 = { substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'] };

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
