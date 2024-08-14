/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../data/paths';

import iconSchool from '../theme/school.svg';
import iconUploadFile from '../theme/upload_file.svg';
import iconManufacturing from '../theme/manufacturing.svg';
import '../styles/SettingsRow.scss';

export default function SettingsRow({ children }) {
  const navigate = useNavigate();
  return (
    <div
      className="SettingsRow"
    >
      <div className="row">
        <button
          className="iconButton secondary"
          type="button"
          onClick={() => navigate(`/genshin/${paths.DOCUMENTATION}`)}
        >
          <img src={iconSchool} alt="documentation" />
          <span>Documentation</span>
        </button>
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
    </div>
  );
}
