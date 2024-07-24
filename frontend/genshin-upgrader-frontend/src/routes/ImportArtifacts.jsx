/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import paths from '../data/paths';
import Artifact from '../components/Artifact';
import WindowActions from '../components/WindowActions';

import '../styles/ImportArtifacts.scss';
import { loadStateFromStorage } from '../data/localStorage';
import { updateArtifacts } from '../data/actions/artifacts';

const setToExtractedJsonString = (setData) => (
  JSON.stringify(
    {
      format: 'GOOD',
      source: 'extracted',
      version: 1,
      artifacts: setData,
    },
    null,
    2,
  )
);

export default function ImportArtifacts({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [artifactData, setArtifactData] = useState({
    full: '',
    fullIsValid: true,
    sets: {},
  });
  const [selectedSet, setSelectedSet] = useState('');

  useEffect(() => {
    // Get data from local storage
    const jsonString = loadStateFromStorage(
      paths.localStorage.artifactsJson,
      {},
      '',
    ).data;

    // Split into sets to enable editing in tabs with invalid data
    const dataState = {
      full: jsonString,
      fullIsValid: true,
      sets: {},
    };

    // Split data into sets
    const jsonData = JSON.parse(jsonString);
    const includedSets = jsonData.artifacts.map((artifact) => artifact.setKey);
    const uniqueSets = [...new Set(includedSets)];
    uniqueSets.forEach((set) => {
      dataState.sets[set] = {
        jsonString: setToExtractedJsonString(
          jsonData.artifacts.filter((artifact) => artifact.setKey === set),
        ),
        isValidJson: true,
      };
    });

    setArtifactData(dataState);
  }, []);

  // handlers
  const handleClickArtifact = (set) => {
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
        // full data
        setArtifactData((state) => ({
          full: jsonString,
          fullIsValid: true,
          sets: state.sets,
        }));
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
        const updatedSets = {};
        Object.keys(state.sets).forEach((set) => {
          if (set === selectedSet) {
            updatedSets[selectedSet] = {
              jsonString,
              isValidJson: true,
            };
          } else {
            updatedSets[set] = state.sets[set];
          }
          return state.sets[set];
        });

        return {
          full: JSON.stringify(fullData, null, 2),
          fullIsValid: true,
          sets: updatedSets,
        };
      });
    } catch (e) {
      // invalid json
      if (selectedSet === '') {
        // full data
        setArtifactData((state) => ({
          full: jsonString,
          fullIsValid: false,
          sets: state.sets,
        }));
        return;
      }

      // set data of sets with the active invalid set
      setArtifactData((state) => {
        const updatedSets = {};
        Object.keys(state.sets).forEach((set) => {
          if (set === selectedSet) {
            updatedSets[selectedSet] = {
              jsonString,
              isValidJson: false,
            };
          } else {
            updatedSets[set] = state.sets[set];
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
    dispatch(updateArtifacts(JSON.parse(artifactData.full)));
    navigate('/');
  };

  // Is the displayed json valid?
  let jsonIsValid;
  if (selectedSet === '') {
    jsonIsValid = artifactData.fullIsValid;
  } else {
    jsonIsValid = artifactData.sets[selectedSet].isValidJson;
  }

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
          {/* <br />
          <br />
          Hint: The textbox turns red if the data is invalid.
          Ask ChatGPT to &quot;fix the json file&quot; you. */}
        </span>
        <div className="artifacts">
          <Box
            className={jsonIsValid ? '' : 'error'}
          >
            <textarea
              type="text"
              placeholder="Paste your data here"
              value={selectedSet === '' ? artifactData.full : artifactData.sets[selectedSet].jsonString}
              onChange={(e) => handleChangeData(e.target.value)}
            />
          </Box>
          <div className="sets">
            {
              Object.keys(artifactData.sets).map((set) => (
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
          isValid={artifactData.fullIsValid}
        />
      </Box>
    </div>
  );
}
