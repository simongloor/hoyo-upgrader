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

// function getWearerIsOccupied(buildOwner, byOwner) {
//   // if (!byOwner[buildOwner]) {
//   //   return false;
//   // }
//   return byOwner[buildOwner].some((build) => build.artifactWearer === buildOwner);
// }

// export function getFreeWearer(buildOwner, byOwner) {
//   // 
//   if (!getWearerIsOccupied(buildOwner, byOwner)) {
  //     return buildOwner;
  //   }
//   let wearer = buildOwner;
//   let i = 1;
//   while (getWearerIsOccupied(wearer, byOwner)) {
  //     wearer = `${buildOwner} ${i}`;
  //     i += 1;
  //   }
//   return wearer;
// }

export function getFreeWearers(byOwner) {
  const freeWearers = [];
  Object.keys(byOwner).forEach((buildOwner) => {
    const wearer = byOwner[buildOwner].artifactWearer;
    if (freeWearers.every((w) => w.wearer !== wearer)) {
      freeWearers.push({
          wearer,
          owner: buildOwner,
        });
    }
  });
  return freeWearers;
}
