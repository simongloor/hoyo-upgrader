/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
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
  return (
    <div
      className="Home"
    >
      <ArtifactInventory counts={artifacts.counts} />
      <AccountOverview
        characterData={characterJson}
        artifactData={artifacts.byCharacter}
      />
      <ArtifactOverview
        characterData={characterJson}
        artifactData={artifacts.asList}
      />
      <Filter />
    </div>
  );
}
