/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  // Filter artifacts
  useEffect(() => {
    const artifactsToFilter = { ...artifacts };
    if (filter.set) {
      // Only Artifacts that belong to the set should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.setKey === filter.set);

      // Only CharacterOverviews that want the set should be displayed
      artifactsToFilter.byCharacter = Object.keys(artifactsToFilter.byCharacter)
        .reduce((acc, character) => {
          if (
            Object.keys(characterJson).includes(character)
          ) {
            characterJson[character].forEach((build, i) => {
              if (build.sets.includes(filter.set)) {
                acc[character] = artifactsToFilter.byCharacter[character];
              }
            });
          }
          return acc;
        }, {});
    }
    if (filter.piece) {
      // Only Artifacts that belong to the piece should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.slotKey === filter.piece);
    }
    if (filter.character && filter.build) {
      // Only Artifacts that can be used by the build should be displayed
      const buildData = characterJson[filter.character].find(
        (build) => build.build === filter.build,
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
      if (artifactsToFilter.byCharacter[filter.character]) {
        artifactsToFilter.byCharacter = {
          [filter.character]: artifactsToFilter.byCharacter[filter.character],
        };
      }
    }
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
