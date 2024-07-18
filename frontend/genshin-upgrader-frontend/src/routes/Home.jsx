/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/config/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import loadGoodArtifacts from '../data/actions/artifacts';

import Filter from '../components/Filter';
import AccountOverview from '../components/AccountOverview';
import ArtifactOverview from '../components/ArtifactOverview';
import ArtifactInventory from '../components/ArtifactInventory';

import '../styles/Home.scss';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGoodArtifacts(artifactsJson));
  }, [dispatch]);

  const artifacts = useSelector((state) => state.artifacts);
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
        .filter((artifact) => artifact.pieceKey === filter.piece);
    }
    if (filter.character && filter.build) {
      // Only Artifacts that can be used by the build should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => (
          characterJson[filter.character].find(
            (build) => build.build === filter.build,
          ).sets.includes(artifact.setKey)
        ));

      // Only the CharacterOverview that matches the build should be displayed
      artifactsToFilter.byCharacter = {
        [filter.character]: artifactsToFilter.byCharacter[filter.character],
      };
    }
    console.log(artifactsToFilter);
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return (
    <div
      className="Home"
    >
      <ArtifactInventory counts={artifacts.counts} />
      <AccountOverview
        characterData={characterJson}
        artifactData={filteredArtifacts.byCharacter}
      />
      <ArtifactOverview
        characterData={characterJson}
        artifactData={filteredArtifacts.asList}
      />
      <Filter />
    </div>
  );
}
