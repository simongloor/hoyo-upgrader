/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/mock/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import { loadArtifacts } from '../data/actions/artifacts';
import { loadCharacters } from '../data/actions/characters';
import useFilter from '../hooks/useFilter';

import SettingsRow from '../components/SettingsRow';
import StatsCheatSheet from '../components/StatsCheatSheet';
import Filter from '../components/Filter';
import Pinboard from '../components/PinBoard';
import AccountOverview from '../components/AccountOverview';
import ArtifactOverview from '../components/ArtifactOverview';
import ArtifactInventory from '../components/ArtifactInventory';

import '../styles/Home.scss';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArtifacts(artifactsJson));
    dispatch(loadCharacters(characterJson));
  }, [dispatch]);

  const artifacts = useSelector((state) => state.artifacts);
  const characters = useSelector((state) => state.characters);
  const filteredArtifacts = useFilter(artifacts, characterJson);

  return (
    <div
      className="Home page"
    >
      <StatsCheatSheet />
      <SettingsRow />
      <ArtifactInventory counts={artifacts.counts} />
      <AccountOverview
        characterData={characters}
        artifactData={filteredArtifacts.byCharacter}
      />
      <ArtifactOverview
        characterData={characters}
        artifactData={filteredArtifacts.asList}
      />
      <Pinboard />
      <Filter />
    </div>
  );
}
