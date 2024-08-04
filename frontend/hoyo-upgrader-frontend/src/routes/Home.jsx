/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/mock/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import { loadArtifacts } from '../data/actions/artifacts';
import { loadCharacters } from '../data/actions/characters';
import useFilter from '../hooks/useFilter';

import SettingsRow from '../components/SettingsRow';
import Filter from '../components/Filter';
import Pinboard from '../components/Pinboard';
import AccountOverview from '../components/AccountOverview';
import ArtifactOverview from '../components/ArtifactOverview';
import ArtifactInventory from '../components/ArtifactInventory';

// import { getRelevantSubstatsByWearer } from '../data/substats';
import useEvaluation from '../hooks/useEvaluation';
import useBuildFilter from '../hooks/useBuildFilter';
import useArtifactFilter from '../hooks/useArtifactFilter';
import Recommendations from '../components/Recommendations';
import '../styles/Home.scss';

export default function Home() {
  const dispatch = useDispatch();

  const artifacts = useSelector((state) => state.artifacts);
  const characters = useSelector((state) => state.characters);
  const evaluatedArtifacts = useEvaluation(artifacts, characters);

  // const filteredBuilds = useBuildFilter(artifacts, characters);
  // const filteredArtifacts = useArtifactFilter(artifacts, characters);

  useEffect(() => {
    dispatch(loadArtifacts(artifactsJson));
    dispatch(loadCharacters(characterJson));
  }, [dispatch]);

  // useEffect(() => {
  //   if (artifacts && characters) {
  //     setRelevantSubstatsByWearer(
  //       getRelevantSubstatsByWearer(artifacts.byWearer, characters),
  //     );
  //   }
  // }, [artifacts, characters]);

  return (
    <div
      className="Home page"
    >
      <SettingsRow />
      <Recommendations counts={artifacts.groupCounts} />
      <ArtifactInventory counts={artifacts.counts} />
      {/* <AccountOverview
        characterData={characters}
        artifactsByWearer={filteredBuilds}
      />
      <ArtifactOverview
        characterData={characters}
        artifactsAsList={filteredArtifacts}
      /> */}
      <Pinboard />
      <Filter />
    </div>
  );
}
