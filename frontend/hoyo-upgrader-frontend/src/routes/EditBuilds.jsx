/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import characterJson from '../data/config/characters.json';

import Box from '../components/Box';
import WindowActions from '../components/WindowActions';
import CharacterEditor from '../components/CharacterEditor';

import '../styles/EditBuilds.scss';

export default function EditBuilds() {
  const navigate = useNavigate();

  // handlers
  const handleClickSave = () => {
    navigate('/genshin');
  };

  // render
  return (
    <Box
      className="EditBuilds page"
    >
      <h2>Edit Character Builds</h2>
      <span>
        While the Genshin Upgrader certainly has its own method,
        how the value of an artifact is evaluated,
        the characters that you want to build and the stats you are looking for can be
        modified by you.
        <br />
        <br />
        To define the desired stats and sets, simply select them below.
        <br />
        <br />
        It is recommended to only select stats that are actually useful for the intended build:
        <br />
        hen you want to focus Bennett on healing, don’t select crit stats.
      </span>
      {
        Object.keys(characterJson).map((characterName) => (
          <CharacterEditor
            characterName={characterName}
            characterBuilds={characterJson[characterName]}
          />
        ))
      }
      <div className="return">
        <WindowActions
          onClickCancel={() => navigate('/genshin')}
          onClickSave={handleClickSave}
          isValid
        />
      </div>
    </Box>
  );
}
