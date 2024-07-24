/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  // Filter artifacts
  useEffect(() => {
    const artifactsToFilter = { ...artifacts };
    if (filter.specificSet) {
      // Only Artifacts that belong to the set should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.setKey === filter.specificSet);

      // Only CharacterOverviews that want the set should be displayed
      artifactsToFilter.byCharacter = Object.keys(artifactsToFilter.byCharacter)
        .reduce((acc, character) => {
          if (
            Object.keys(characterJson).includes(character)
          ) {
            characterJson[character].forEach((build, i) => {
              if (build.sets.includes(filter.specificSet)) {
                acc[character] = artifactsToFilter.byCharacter[character];
              }
            });
          }
          return acc;
        }, {});
    }
    if (filter.specificPiece) {
      // Only Artifacts that belong to the piece should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.slotKey === filter.specificPiece);
    }
    if (filter.characterName && filter.characterBuildName) {
      // Only Artifacts that can be used by the build should be displayed
      const buildData = characterJson[filter.characterName].find(
        (build) => build.substats.join('-') === filter.characterBuildName,
      );
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => (
          buildData.sets.includes(artifact.setKey)
          && (
            artifact.slotKey === 'flower'
            || artifact.slotKey === 'plume'
            || buildData.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
          )
        ));

      // Only the CharacterOverview that matches the build should be displayed
      if (artifactsToFilter.byCharacter[filter.characterName]) {
        artifactsToFilter.byCharacter = {
          [filter.characterName]: artifactsToFilter.byCharacter[filter.characterName],
        };
      }
    }
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
