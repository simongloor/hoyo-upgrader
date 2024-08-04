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

import '../styles/Home.scss';
import { getEquippedArtifactsSubstats } from '../data/substats';
import Recommendations from '../components/Recommendations';

export default function Home() {
  const dispatch = useDispatch();

  const artifacts = useSelector((state) => state.artifacts);
  const characters = useSelector((state) => state.characters);
  const filteredArtifacts = useFilter(artifacts, characters);
  // console.log(filteredArtifacts);
  const [equippedArtifactsSubstats, setEquippedArtifactsSubstats] = useState({});

  useEffect(() => {
    dispatch(loadArtifacts(artifactsJson));
    dispatch(loadCharacters(characterJson));
  }, [dispatch]);

  useEffect(() => {
    if (artifacts && characters) {
      setEquippedArtifactsSubstats(
        getEquippedArtifactsSubstats(artifacts.byCharacter, characters),
      );
    }
  }, [artifacts, characters]);

  return (
    <div
      className="Home page"
    >
      <SettingsRow />
      <Recommendations counts={artifacts.groupCounts} />
      <ArtifactInventory counts={artifacts.counts} />
      <AccountOverview
        characterData={characters}
        artifactData={filteredArtifacts.byCharacter}
        equippedArtifactsSubstats={equippedArtifactsSubstats}
      />
      <ArtifactOverview
        characterData={characters}
        artifactData={filteredArtifacts.asList}
        equippedArtifactsSubstats={equippedArtifactsSubstats}
      />
      <Pinboard />
      <Filter />
    </div>
  );
}
