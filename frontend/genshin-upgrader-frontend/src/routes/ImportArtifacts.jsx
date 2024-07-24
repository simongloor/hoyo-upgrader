/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import paths from '../data/paths';
import Artifact from '../components/Artifact';
import WindowActions from '../components/WindowActions';

import '../styles/ImportArtifacts.scss';
import { getDefaultLocalStorageState, loadStateFromStorage } from '../data/localStorage';

export default function ImportArtifacts({ children }) {
  const navigate = useNavigate();

  const [artifactData, setArtifactData] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');

  useEffect(() => {
    // Get data from local storage
    const jsonString = loadStateFromStorage(
      paths.localStorage.artifactsJson,
      getDefaultLocalStorageState(),
      '',
    ).data;

    // Split into sets to enable editing in tabs with invalid data
    const dataState = {
      full: jsonString,
      sets: {},
    };

    // Split data into sets
    const jsonData = JSON.parse(jsonString);
    const includedSets = jsonData.artifacts.map((artifact) => artifact.setKey);
    const uniqueSets = [...new Set(includedSets)];
    uniqueSets.forEach((set) => {
      dataState.sets[set] = {
        jsonString: JSON.stringify(
          jsonData.artifacts.filter((artifact) => artifact.setKey === set),
          null,
          2,
        ),
        isValidJson: true,
      };
    });

    setArtifactData(dataState);
  }, []);

  // handlers
  const handleClickArtifact = (set) => {
    console.log('set', set);
    if (selectedSet === set) {
      setSelectedSet('');
      return;
    }
    setSelectedSet(set);
  };

  const handleChangeData = (jsonString) => {
    let newJsonData = {};
    try {
      // try to process valid json data
      newJsonData = JSON.parse(jsonString);

      // set or full?
      if (selectedSet === '') {
        setArtifactData(jsonString);
        return;
      }

      // update full data
      const fullData = JSON.parse(artifactData.full);
      fullData.artifacts = fullData.artifacts.filter((artifact) => artifact.setKey !== selectedSet);
      fullData.artifacts.push(
        ...newJsonData.artifacts.filter((artifact) => artifact.setKey === selectedSet),
      );

      // update set data
      setArtifactData((state) => {
        const updatedSets = Object.keys(state.sets).map((set) => {
          if (set === selectedSet) {
            return {
              jsonString,
              isValidJson: true,
            };
          }
          return state.sets[set];
        });

        return {
          full: JSON.stringify(fullData, null, 2),
          sets: updatedSets,
        };
      });
    } catch (e) {
      // invalid json
      if (selectedSet === '') {
        // full data
        setArtifactData((state) => ({
          full: jsonString,
          sets: state.sets,
        }));
        return;
      }

      // set data
      setArtifactData((state) => {
        const updatedSets = Object.keys(state.sets).map((set) => {
          if (set === selectedSet) {
            return {
              jsonString,
              isValidJson: false,
            };
          }
          return state.sets[set];
        });

        return {
          full: state.full,
          sets: updatedSets,
        };
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };
  const handelSave = () => {
    console.log('save');
  };

  // render
  return (
    <div
      className="ImportArtifacts page"
    >
      <Box>
        <h2>Import Artifacts</h2>
        <span>
          1. Scan your artifacts or export a database from Genshin Optimizer.
          Here are some great scanners:
          https://frzyc.github.io/genshin-optimizer/#/scanner
          <br />
          <br />
          2. Either replace the whole data set directly in the text box below,
          or click on an artifact set update only a specific set.
        </span>
        <div className="artifacts">
          <Box>
            <textarea
              type="text"
              placeholder="Paste your data here"
              value={selectedSet === '' ? artifactData.full : artifactData.sets[selectedSet]}
              onChange={(e) => handleChangeData(e.target.value)}
            />
          </Box>
          <div className="sets">
            {
              Object.keys(paths.set).map((set) => (
                <button
                  className={selectedSet === '' || selectedSet === set ? '' : 'filtered'}
                  key={set}
                  type="button"
                  onClick={() => handleClickArtifact(set)}
                  alt={set}
                >
                  <Artifact
                    set={set}
                    piece="flower"
                  />
                </button>
              ))
            }
          </div>
        </div>
        <WindowActions
          onClickCancel={handleCancel}
          onClickSave={handelSave}
        />
      </Box>
    </div>
  );
}
