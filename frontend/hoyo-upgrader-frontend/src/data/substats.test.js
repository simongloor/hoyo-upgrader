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
    { key: 'critRate_', value: 3 },
    { key: 'critDMG_', value: 5 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 1,
    critDMG_: 1,
    critRate_: 0,
    def: 1,
    def_: 1,
    eleMas: 0,
    enerRech_: 0,
    hp: 0,
    hp_: 0,
  },
};
const testBuild_1 = { substats: ['enerRech_', 'critRate_', 'critDMG_'] };

test('gets correct impossibleSubstats case 1', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  expect(relevantSubstats.impossibleSubstats).toEqual(2);
});
test('gets correct wastedSubstats case 1', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 0 because 2 substats are impossible
  expect(relevantSubstats.wastedSubstats).toEqual(0);
});
test('gets correct assumedUsefulMissingSlots case 1', () => {
  const { assumedUsefulMissingSlots } = getRelevantSubstatsOfArtifact(testSands_1, testBuild_1);
  // should be 1 because slot could roll into critRate_
  expect(assumedUsefulMissingSlots).toEqual(1);
});
