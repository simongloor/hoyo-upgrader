/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import paths from '../data/paths';
import Artifact from '../components/Artifact';
import WindowActions from '../components/WindowActions';

import '../styles/ImportArtifacts.scss';

export default function ImportArtifacts({ children }) {
  const navigate = useNavigate();

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
        <Box>
          <textarea
            type="text"
            placeholder="Paste your data here"
          />
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
        </Box>
        <WindowActions
          onClickCancel={handleCancel}
          onClickSave={handelSave}
        />
      </Box>
    </div>
  );
}
