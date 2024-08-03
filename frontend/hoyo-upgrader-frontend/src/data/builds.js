/* eslint-disable import/prefer-default-export */

import paths from './paths';

// // jsonData is structured like this:
// // { artifactWearer: { buildOwner: characterName, ... }}
// // We want to structure it like this:
// // { buildOwner: [{ artifactWearer: characterName, ... }] }
// // This way, we can easily add new builds to a character
// export function sortBuildsByOwner(byWearer) {
//   const byOwner = {};
//   Object.keys(byWearer).forEach((artifactWearer) => {
//     if (byWearer[artifactWearer]) {
//       const ownerName = byWearer[artifactWearer].buildOwner;
//       if (!byOwner[ownerName]) {
//         byOwner[ownerName] = [];
//       }
//       byOwner[ownerName].push({
//         artifactWearer,
//         ...byWearer[artifactWearer],
//       });
//     }
//   });
//   return byOwner;
// }

// export function sortBuildsByWearer(byOwner) {
//   const byWearer = {};
//   Object.keys(byOwner).forEach((buildOwner) => {
//     byOwner[buildOwner].forEach((build) => {
//       byWearer[build.artifactWearer] = {
//         buildOwner,
//         ...build,
//       };
//     });
//   });
//   return byWearer;
// }

// function getWearerIsOccupied(buildOwner, byOwner) {
//   // if (!byOwner[buildOwner]) {
//   //   return false;
//   // }
//   return byOwner[buildOwner].some((build) => build.artifactWearer === buildOwner);
// }

// export function getFreeWearer(buildOwner, byOwner) {
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

function getBusyWearers(byOwner) {
  if (!byOwner) {
    return [];
  }
  const busyWearers = [];
  Object.keys(byOwner).forEach((buildOwner) => {
    const builds = byOwner[buildOwner];
    builds.forEach((build) => {
      const wearer = build.artifactWearer;
      if (busyWearers.every((w) => w.wearer !== wearer)) {
        busyWearers.push({
          wearer,
          owner: buildOwner,
        });
      }
    });
  });
  return busyWearers;
}

export function getWearerStates(byOwner) {
  const wearerStates = {
    busy: getBusyWearers(byOwner),
    free: [],
  };
  Object.keys(paths.character).forEach((characterName) => {
    if (wearerStates.busy.every((w) => w.wearer !== characterName)) {
      wearerStates.free.push(characterName);
    }
  });
  return wearerStates;
}
