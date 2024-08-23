/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { countSubstats, getRelevantSubstatsOfArtifact } from './substats';

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
const testSands_3 = {
  piece: 'sands',
  level: 20,
  rarity: 5,
  mainStatKey: 'enerRech_',
  substats: [
    { key: 'def', value: 80 },
    { key: 'def_', value: 4 },
    { key: 'hp', value: 219 },
    { key: 'hp_', value: 5 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 5,
    def_: 1,
    eleMas: 0,
    enerRech_: 0,
    hp: 1,
    hp_: 1,
  },
};
const testSands_4 = {
  piece: 'sands',
  level: 0,
  rarity: 5,
  mainStatKey: 'enerRech_',
  substats: [
    { key: 'def', value: 80 },
    { key: 'def_', value: 4 },
    { key: 'hp', value: 219 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 1,
    def_: 1,
    eleMas: 0,
    enerRech_: 0,
    hp: 1,
    hp_: 0,
  },
};
const testFlower_1 = {
  piece: 'flower',
  level: 0,
  rarity: 5,
  mainStatKey: 'enerRech_',
  substats: [
    { key: 'critDMG_', value: 7 },
    { key: 'critRate_', value: 2.7 },
    { key: 'atk_', value: 5.8 },
    { key: 'def_', value: 7.3 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 1,
    critDMG_: 1,
    critRate_: 1,
    def: 0,
    def_: 1,
    eleMas: 0,
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
const testGoblet_1 = {
  location: 'Kazuha',
  piece: 'goblet',
  level: 0,
  rarity: 5,
  mainStatKey: 'eleMas',
  substats: [
    { key: 'hp', value: 239 },
    { key: 'enerRech_', value: 5.8 },
    { key: 'def', value: 23 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 1,
    def_: 0,
    eleMas: 0,
    enerRech_: 1,
    hp: 1,
    hp_: 0,
  },
};
const testGoblet_2 = {
  location: 'Kazuha',
  piece: 'goblet',
  level: 0,
  rarity: 5,
  mainStatKey: 'eleMas',
  substats: [
    { key: 'hp', value: 239 },
    { key: 'def_', value: 5.8 },
    { key: 'def', value: 23 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 1,
    def_: 1,
    eleMas: 0,
    enerRech_: 0,
    hp: 1,
    hp_: 0,
  },
};
const testGoblet_3 = {
  location: 'Kazuha',
  piece: 'goblet',
  level: 8,
  rarity: 5,
  mainStatKey: 'eleMas',
  substats: [
    { key: 'hp', value: 239 },
    { key: 'def_', value: 5.8 },
    { key: 'def', value: 23 },
    { key: 'enerRech_', value: 5.8 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 1,
    def_: 1,
    eleMas: 0,
    enerRech_: 2,
    hp: 1,
    hp_: 0,
  },
};
const testGoblet_4 = {
  location: 'Bennett',
  piece: 'goblet',
  level: 4,
  rarity: 5,
  mainStatKey: 'eleMas',
  substats: [
    { key: 'hp', value: 239 },
    { key: 'def_', value: 5.8 },
    { key: 'def', value: 23 },
    { key: 'enerRech_', value: 5.8 },
  ],
  substatCounts: {
    atk: 0,
    atk_: 0,
    critDMG_: 0,
    critRate_: 0,
    def: 1,
    def_: 1,
    eleMas: 0,
    enerRech_: 2,
    hp: 1,
    hp_: 0,
  },
};
const testBuild_1 = { substats: ['enerRech_', 'critRate_', 'critDMG_'] };
const testBuild_2 = { substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'] }; // xl
const testBuild_3 = { substats: ['enerRech_', 'critRate_', 'hp_'] };
const testBuild_4 = { substats: ['enerRech_'] };
const testBuild_5 = { substats: ['atk_', 'critRate_', 'critDMG_', 'enerRech_'] };
const testBuild_6 = { substats: ['enerRech_'] }; // kazuha

test('gets correct substat counts case 1', () => {
  const substatCounts = countSubstats(testFlower_1);
  expect(substatCounts.critDMG_).toEqual(1);
  expect(substatCounts.critRate_).toEqual(1);
  expect(substatCounts.atk_).toEqual(1);
  expect(substatCounts.def_).toEqual(1);
  expect(substatCounts.enerRech_).toEqual(0);
});
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
  // should be 1 because one missed initial roll. the last slot could roll into critRate_
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
  // should be 0.9375 because the 2nd roll could either be critRate_ or critDMG_
  // 93.75% is the chance that at least one of the 4 rolls left is valuable
  expect(relevantSubstats.missingRollChances[1]).toEqual(0.9375);
});
test('gets correct missingRollChances case 3', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_2, testBuild_1);
  // should be 1 because the 1st + 2nd rolls could go into critRate_ and critDMG_
  expect(relevantSubstats.missingRollChances[1]).toEqual(1.0);
});
test('gets correct missingRollChances case 4', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_2, testBuild_1);
  // should be 0.75 because the 3rd roll could go into critRate_ or critDMG_
  // 75% is the chance that at least one of the 2 rolls left is valuable
  expect(relevantSubstats.missingRollChances[2]).toEqual(0.75);
});
test('gets correct missingRollChances case 5', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 1 because the 1th roll could go into critRate_
  expect(relevantSubstats.missingRollChances[0]).toEqual(1.0);
});
test('gets correct missingRollChances case 6', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 0 because the 2nd roll can't roll into anything useful
  // console.log(relevantSubstats.missingRollChances);
  expect(relevantSubstats.missingRollChances[1]).toEqual(0.0);
});
test('gets correct missingRollChances case 7', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testPlume_1, testBuild_3);
  // should be 0.9375 because there are three valuable substats
  // 93.75% is the chance that at least one of the 2 rolls left is valuable
  expect(relevantSubstats.missingRollChances[2]).toEqual(0.9375);
});
test('gets correct missingRollChances case 8', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_3, testBuild_1);
  // should be an empty array because there are no missing rolls
  expect(relevantSubstats.missingRollChances.length).toEqual(0);
});
test('gets correct missingRollChances case 9', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testSands_4, testBuild_4);
  // should be an array with 0% chance because are no useful substats for the build
  expect(relevantSubstats.missingRollChances[0]).toEqual(0);
});
test('gets correct missingRollChances case 10', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testFlower_1, testBuild_5);
  // should be 0.9990234375 because all substats already exist and one substat is useless
  // 99.9% is the chance that at least one of the 5 rolls left is valuable
  // console.log(relevantSubstats.missingRollChances);
  expect(relevantSubstats.missingRollChances[0]).toEqual(0.9990234375);
});
test('gets correct wastedSubstats case 11', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testGoblet_1, testBuild_6);
  // should be 1 because there is one missing initial substat
  // console.log(relevantSubstats);
  expect(relevantSubstats.wastedSubstats).toEqual(1);
  // expect(relevantSubstats.missingRollChances.length).toEqual(5);
  // expect(relevantSubstats.impossibleSubstats).toEqual(3);
});
test('gets correct wastedSubstats case 12', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testGoblet_2, testBuild_6);
  // should be 1 because there is one missing initial substat, the last valuable slot could succeed
  // console.log(relevantSubstats);
  expect(relevantSubstats.wastedSubstats).toEqual(1);
});
test('gets correct wastedSubstats case 13', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testGoblet_3, testBuild_6);
  // should be 1 because there is one missing initial substat but all optional rolls succeeded
  // console.log(relevantSubstats);
  expect(relevantSubstats.wastedSubstats).toEqual(1);
});
test('gets correct wastedSubstats case 14', () => {
  const { relevantSubstats } = getRelevantSubstatsOfArtifact(testGoblet_4, testBuild_6);
  // should be 0 because there is no missing initial substat and all optional rolls succeeded
  // console.log(relevantSubstats);
  expect(relevantSubstats.wastedSubstats).toEqual(0);
});
