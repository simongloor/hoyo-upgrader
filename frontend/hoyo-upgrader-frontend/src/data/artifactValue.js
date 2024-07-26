/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const valueTypes = [
  'TRASH',
  'ROLL_TO_4',
  'VALUABLE',
];

//---------------------------------------------------------

function getCustomArtifactValue(
  hasAllStats,
  possibleImprovementOnAnybody,
  highestValuableSlotsOnCharacters,
  universalSlots,
  minSubstatValue,
) {
  // potential future characters
  if (universalSlots >= minSubstatValue) return valueTypes.VALUABLE;
  if (!hasAllStats && universalSlots >= minSubstatValue - 1) return valueTypes.ROLL_TO_4;

  // current characters
  if (!possibleImprovementOnAnybody) return valueTypes.TRASH;
  if (highestValuableSlotsOnCharacters >= minSubstatValue) return valueTypes.VALUABLE;
  if (!hasAllStats && highestValuableSlotsOnCharacters >= minSubstatValue - 1) return valueTypes.ROLL_TO_4;

  return valueTypes.VALUABLE;
}

function getArtifactValue(
  piece,
  hasAllStats,
  possibleImprovementOnAnybody,
  highestValuableSlotsOnCharacters,
  universalSlots,
) {
  switch (piece) {
    case 'sands':
    case 'goblet':
    case 'circlet':
      return getCustomArtifactValue(
        hasAllStats,
        possibleImprovementOnAnybody,
        highestValuableSlotsOnCharacters,
        universalSlots,
        2,
      );
    default:
      return getCustomArtifactValue(
        hasAllStats,
        possibleImprovementOnAnybody,
        highestValuableSlotsOnCharacters,
        universalSlots,
        3,
      );
  }
}

//---------------------------------------------------------

function getIsPossibleImprovementOnAnybody(artifactEvaluation) {
  return true;
}

//---------------------------------------------------------

export default function getRecommendation(
  artifactEvaluation,
) {
  console.log(artifactEvaluation);

  const { substats, piece } = artifactEvaluation.artifactData;
  const hasAllStats = substats.length === 4;
  const possibleImprovementOnAnybody = getIsPossibleImprovementOnAnybody(artifactEvaluation);
  
}
