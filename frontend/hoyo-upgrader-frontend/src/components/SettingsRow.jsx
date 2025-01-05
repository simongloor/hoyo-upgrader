/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../data/paths';

import Header from './Header';

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
    <Header
      className="SettingsRow"
      buttonsLeft={(
        <>
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
        </>
      )}
      buttonsRight={(
        <button
          className={`iconButton ${activeTutorial ? 'secondary' : 'primary'}`}
          type="button"
          onClick={() => onClickTutorial(!activeTutorial)}
        >
          <img src={iconSchool} alt="documentation" />
          <span>Tutorials</span>
        </button>
      )}
      buttonsDropdown={(
        <button
          className="primary"
          type="button"
          onClick={() => navigate(`/genshin/${paths.TEAM_UPGRADER}`)}
        >
          <span>Team Upgrader (BETA)</span>
        </button>
      )}
    />
  );
}
