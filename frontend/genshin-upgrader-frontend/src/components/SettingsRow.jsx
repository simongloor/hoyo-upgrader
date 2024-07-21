/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../data/paths';

import Box from './Box';
import '../styles/SettingsRow.scss';

export default function SettingsRow({ children }) {
  const navigate = useNavigate();
  return (
    <Box
      className="SettingsRow"
    >
      <div className="row">
        <button
          className="secondary"
          type="button"
          onClick={() => navigate(`/${paths.DOCUMENTATION}`)}
          disabled
        >
          <span>Documentation</span>
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => navigate(`/${paths.IMPORT_ARTIFACTS}`)}
        >
          <span>Import Artifacts</span>
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => navigate(`/${paths.EDIT_BUILDS}`)}
          disabled
        >
          <span>Edit Character Builds</span>
        </button>
      </div>
    </Box>
  );
}
