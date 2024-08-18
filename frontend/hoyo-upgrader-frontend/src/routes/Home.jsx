/* eslint-disable no-unused-vars */
import React, { Profiler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import characterJson from '../data/mock/characters.json';
import artifactsJson from '../data/mock/artifacts.json';
import { loadArtifacts } from '../data/actions/artifacts';
import { loadCharacters } from '../data/actions/characters';
import { toggleSpecificSetFilter } from '../data/actions/filter';

import useArtifactEvaluation from '../hooks/useArtifactEvaluation';
import useBuildEvaluation from '../hooks/useBuildEvaluation';
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
import TutorialOverview from '../components/TutorialOverview';
import useSettings from '../hooks/useSettings';

export default function Home() {
  const dispatch = useDispatch();

  const [activePopup, setActivePopup] = useState(null);

  const artifacts = useSelector((state) => state.artifacts);
  const characters = useSelector((state) => state.characters);

  const {
    activeTutorial,
    handleSetTutorial,
  } = useSettings();

  // non-interactive - precalculation possible
  const evaluatedArtifacts = useArtifactEvaluation(artifacts, characters);
  const recommendations = useRecommendations(
    evaluatedArtifacts,
    characters,
    artifacts.groupCounts,
  );
  const evaluatedBuilds = useBuildEvaluation(evaluatedArtifacts, characters);

  // interactive
  const filteredBuilds = useBuildFilter(evaluatedBuilds);
  const filteredArtifacts = useArtifactFilter(evaluatedArtifacts, characters);

  useEffect(() => {
    // console.log('Loading stored data');
    dispatch(loadArtifacts(artifactsJson));
    dispatch(loadCharacters(characterJson));
  }, [dispatch]);

  if (!filteredArtifacts) {
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
      <div className="scrollArea">
        <SettingsRow
          activeTutorial={activeTutorial}
          onClickTutorial={handleSetTutorial}
        />
        {
          activeTutorial && (
            <TutorialOverview
              onCloseTutorial={() => handleSetTutorial(false)}
            />
          )
        }
        <Recommendations
          recommendations={recommendations}
        />
        <AccountOverview
          filteredBuilds={filteredBuilds}
        />
        <ArtifactOverview
          artifacts={filteredArtifacts}
        />
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
      </div>
      <div className="border horizontal" />
      <Filter
        onClickArtifactSets={() => setActivePopup('artifactSets')}
      />
    </div>
  );
}
