/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/mock/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import { loadArtifacts } from '../data/actions/artifacts';
import { loadCharacters } from '../data/actions/characters';

import useEvaluation from '../hooks/useEvaluation';
import useRecommendations from '../hooks/useRecommendations';
import useBuildFilter from '../hooks/useBuildFilter';
import useArtifactFilter from '../hooks/useArtifactFilter';

import SettingsRow from '../components/SettingsRow';
import Filter from '../components/Filter';
import Pinboard from '../components/Pinboard';
import AccountOverview from '../components/AccountOverview';
import ArtifactOverview from '../components/ArtifactOverview';
import ArtifactInventory from '../components/ArtifactInventory';
import Recommendations from '../components/Recommendations';

import '../styles/Home.scss';
import { toggleSpecificSetFilter } from '../data/actions/filter';

export default function Home() {
  const dispatch = useDispatch();
  const [activePopup, setActivePopup] = useState(null);

  const artifacts = useSelector((state) => state.artifacts);
  const characters = useSelector((state) => state.characters);

  // non-interactive - precalculation possible
  const evaluatedArtifacts = useEvaluation(artifacts, characters);
  // console.log(artifacts, evaluatedArtifacts);
  const recommendations = useRecommendations(
    evaluatedArtifacts,
    characters,
    artifacts.groupCounts,
  );

  // interactive
  const filteredBuilds = useBuildFilter(characters);
  const filteredArtifacts = useArtifactFilter(evaluatedArtifacts, characters);

  useEffect(() => {
    // console.log('Loading stored data');
    dispatch(loadArtifacts(artifactsJson));
    dispatch(loadCharacters(characterJson));
  }, [dispatch]);

  if (!filteredArtifacts.isEvaluated) {
    return null;
  }

  const handleClickSet = (set) => {
    dispatch(toggleSpecificSetFilter(set));
    setActivePopup(null);
  };

  return (
    <div
      className="Home page"
    >
      <SettingsRow />
      <Recommendations
        recommendations={recommendations}
      />
      <AccountOverview
        filteredBuilds={filteredBuilds}
        artifactsAsList={evaluatedArtifacts.asList}
      />
      {/* <Profiler
        id="ArtifactOverview"
        onRender={(id, phase, actualDuration) => {
          console.log(`${id} took ${actualDuration}ms.`);
          }}
          > */}
      <ArtifactOverview
        artifactsAsList={filteredArtifacts.asList}
      />
      {/* </Profiler> */}
      <Pinboard />
      {
        activePopup
        && (
          <div className="popup">
            <button
              className="backdrop"
              type="button"
              onClick={() => setActivePopup(null)}
              alt="Close artifact inventory"
            />
            {
              activePopup === 'artifactSets' && (
                <ArtifactInventory
                  counts={artifacts.counts}
                  onClickSet={handleClickSet}
                />
              )
            }
          </div>
        )
      }
      <Filter
        onClickArtifactSets={() => setActivePopup('artifactSets')}
      />
    </div>
  );
}
