/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // Filter by set
    if (filter.specificSet) {
      // CharacterOverviews
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

      // Artifacts
      // Only Artifacts that belong to the set should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.setKey === filter.specificSet);
    }

    // Filter by piece
    if (filter.specificPiece) {
      const specificMainStat = filter.mainstat[filter.specificPiece];

      // Artifacts
      // Only Artifacts that belong to the piece should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.slotKey === filter.specificPiece);
      // Also filter by main stat
      if (specificMainStat) {
        artifactsToFilter.asList = artifactsToFilter.asList
          .filter((artifact) => specificMainStat === artifact.mainStatKey);
      }

      // CharacterOverviews
      // Only CharacterOverviews that want the same piece and main stat should be displayed
      if (specificMainStat) {
        artifactsToFilter.byCharacter = { ...artifactsToFilter.byCharacter };
        Object.keys(artifactsToFilter.byCharacter).forEach(
          // remove characters that don't want the same main stat for the piece
          (character) => {
            if (
              Object.keys(characterJson).includes(character)
            ) {
              characterJson[character].forEach((build, i) => {
                if (
                  !build.mainstats[filter.specificPiece].includes(specificMainStat)
                ) {
                  delete artifactsToFilter.byCharacter[character];
                }
              });
            }
          },
        );
      }
    }

    // Filter by character
    if (filter.characterName && filter.characterBuildName) {
      // CharacterOverviews
      // Only the CharacterOverview that matches the build should be displayed
      if (artifactsToFilter.byCharacter[filter.characterName]) {
        artifactsToFilter.byCharacter = {
          [filter.characterName]: artifactsToFilter.byCharacter[filter.characterName],
        };
      }

      // Artifacts
      // Only Artifacts that can be used by the build should be displayed
      if (!(filter.specificPiece && filter.mainstat[filter.specificPiece])) {
        const buildData = characterJson[filter.characterName].find(
          (build) => build.substats.join('-') === filter.characterBuildName,
        );
        artifactsToFilter.asList = artifactsToFilter.asList
          .filter((artifact) => (
            (filter.showOffpieces || buildData.sets.includes(artifact.setKey))
            && (
              artifact.slotKey === 'flower'
              || artifact.slotKey === 'plume'
              || buildData.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
            )
          ));
      }
    }
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
