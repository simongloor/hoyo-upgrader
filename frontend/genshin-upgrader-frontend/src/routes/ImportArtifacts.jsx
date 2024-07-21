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

  useEffect(() => {
    setArtifactData(loadStateFromStorage(
      paths.localStorage.artifactsJson,
      getDefaultLocalStorageState(),
      '',
    ).data);
  }, []);

  // handlers
  const handleClickArtifact = (set) => {
    console.log(`clicked ${set}`);
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
          2. Either replace the whole data set directly in the text box,
          or click on an artifact set update only a specific set.
        </span>
        <div className="artifacts">
          <Box>
            <textarea
              type="text"
              placeholder="Paste your data here"
              value={artifactData}
              onChange={(e) => setArtifactData(e.target.value)}
            />
          </Box>
          <div className="sets">
            {
              Object.keys(paths.set).map((set) => (
                <button
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
