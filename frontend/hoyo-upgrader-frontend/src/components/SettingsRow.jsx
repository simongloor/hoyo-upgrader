/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../data/paths';

import iconSchool from '../theme/school.svg';
import iconUploadFile from '../theme/upload_file.svg';
import iconManufacturing from '../theme/manufacturing.svg';
import '../styles/SettingsRow.scss';

export default function SettingsRow({
  activeTutorial,
  onClickTutorial,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="SettingsRow"
    >
      <div className="row">
        <div>
          <div className="brand">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="noblesse logo"
            />
            <h1>Genshin <strong>Up</strong>grader</h1>
          </div>
          <button
            className="iconButton primary"
            type="button"
            onClick={() => navigate(`/genshin/${paths.IMPORT_ARTIFACTS}`)}
          >
            <img src={iconUploadFile} alt="import artifacts" />
            <span>Import Artifacts</span>
          </button>
          <button
            className="iconButton primary"
            type="button"
            onClick={() => navigate(`/genshin/${paths.EDIT_BUILDS}`)}
          >
            <img src={iconManufacturing} alt="edit builds" />
            <span>Edit Character Builds</span>
          </button>
        </div>
        <button
          className={`iconButton ${activeTutorial ? 'secondary' : 'primary'}`}
          type="button"
          onClick={() => onClickTutorial(!activeTutorial)}
        >
          <img src={iconSchool} alt="documentation" />
          <span>Tutorials</span>
        </button>
      </div>
    </div>
  );
}
