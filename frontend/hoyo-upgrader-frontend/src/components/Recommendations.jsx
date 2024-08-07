/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Artifact from './Artifact';
import Box from './Box';
import '../styles/Recommendations.scss';
import { countUselessArtifacts } from '../data/countArtifacts';

export default function Recommendations({ builds, artifacts, counts }) {
  const dispatch = useDispatch();

  const [uselessArtifacts, setUselessArtifacts] = useState({ sortedGroups: [], groups: {} });

  useEffect(() => {
    if (artifacts.isEvaluated) {
      const newUselessArtifacts = countUselessArtifacts(artifacts.asList, builds);
      // console.log(newUselessArtifacts);
      setUselessArtifacts(newUselessArtifacts);
    }
  }, [artifacts, builds]);

  // event handlers
  const handleClickGroup = (group) => {
    const {
      set,
      piece,
      stat,
      offpieces,
    } = counts.groups[group];
    const setIsValid = Object.keys(paths.set).includes(set);
    dispatch(applyFilter({
      specificPiece: piece,
      filterSpecificSet: setIsValid,
      specificSet: setIsValid ? set : null,
      mainstat: {
        sands: piece === 'sands' ? stat : null,
        goblet: piece === 'goblet' ? stat : null,
        circlet: piece === 'circlet' ? stat : null,
      },
      showOffpieces: offpieces,
    }));
  };

  // render
  return (
    <Box
      className="Recommendations"
    >
      <h2>Build Recommendations</h2>
      <span>Work on these types of artifacts:</span>
      <div className="row">
        {
          counts.sortedGroups
            .slice(0, 16)
            .map((group) => (
              <button
                type="button"
                onClick={() => handleClickGroup(group)}
                alt={group}
                key={group}
              >
                <Artifact
                  piece={counts.groups[group].piece}
                  set={counts.groups[group].set}
                  mainstat={counts.groups[group].stat}
                  count={counts.groups[group].count}
                />
              </button>
            ))
        }
      </div>
      {/* <SpacerPiece className="tile" /> */}
      <span>{`These types of artifacts have pieces with no obvious improvement to anybody (${uselessArtifacts.totalCount}):`}</span>
      <div className="row useless">
        {
          // uselessArtifacts.map((a) => (
          //   <Artifact
          //     key={a.id}
          //     data={a.artifactData}
          //   />
          // ))
          uselessArtifacts.sortedGroups
            .slice(0, 16)
            .map((group) => (
              <button
                type="button"
                onClick={() => handleClickGroup(group)}
                alt={group}
                key={group}
              >
                <Artifact
                  piece={uselessArtifacts.groups[group].piece}
                  set={uselessArtifacts.groups[group].set}
                  mainstat={uselessArtifacts.groups[group].stat}
                  count={uselessArtifacts.groups[group].count}
                />
              </button>
            ))
        }
      </div>
    </Box>
  );
}
