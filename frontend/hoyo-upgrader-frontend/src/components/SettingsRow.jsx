/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '../data/paths';

import Box from './Box';
import '../styles/SettingsRow.scss';
import SpacerPiece from './SpacerPiece';

export default function SettingsRow({ children }) {
  const navigate = useNavigate();
  return (
    <div
      className="SettingsRow"
    >
      <div className="row">
        <button
          className="secondary"
          type="button"
          onClick={() => navigate(`/genshin/${paths.DOCUMENTATION}`)}
        >
          <span>Documentation</span>
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => navigate(`/genshin/${paths.IMPORT_ARTIFACTS}`)}
        >
          <span>Import Artifacts</span>
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => navigate(`/genshin/${paths.EDIT_BUILDS}`)}
        >
          <span>Edit Character Builds</span>
        </button>
      </div>
    </div>
  );
}
