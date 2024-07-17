/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/config/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import loadGoodArtifacts from '../data/actions/artifacts';

import { getBuildsBySets } from '../data/characters';
import Filter from '../components/Filter';
import AccountOverview from '../components/AccountOverview';
import ArtifactOverview from '../components/ArtifactOverview';

import '../styles/Home.scss';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGoodArtifacts(artifactsJson));
  }, [dispatch]);

  console.log(getBuildsBySets(characterJson));

  const artifacts = useSelector((state) => state.artifacts);
  return (
    <div
      className="Home"
    >
      <Filter />
      <AccountOverview
        characterData={characterJson}
        artifactData={artifacts.byCharacter}
      />
      <ArtifactOverview
        artifactData={artifacts.asList}
      />
    </div>
  );
}
