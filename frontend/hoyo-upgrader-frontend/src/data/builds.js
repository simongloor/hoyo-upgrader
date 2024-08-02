/* eslint-disable import/prefer-default-export */

// jsonData is structured like this:
// { artifactWearer: { buildOwner: characterName, ... }}
// We want to structure it like this:
// { buildOwner: [{ artifactWearer: characterName, ... }] }
// This way, we can easily add new builds to a character
export function sortBuildsByOwner(byWearer) {
  const byOwner = {};
  Object.keys(byWearer).forEach((artifactWearer) => {
    if (byWearer[artifactWearer]) {
      const ownerName = byWearer[artifactWearer].buildOwner;
      if (!byOwner[ownerName]) {
        byOwner[ownerName] = [];
      }
      byOwner[ownerName].push({
        artifactWearer,
        ...byWearer[artifactWearer],
      });
    }
  });
  return byOwner;
}
