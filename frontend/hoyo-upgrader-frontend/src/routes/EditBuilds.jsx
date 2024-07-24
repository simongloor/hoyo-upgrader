/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import WindowActions from '../components/WindowActions';
import CharacterEditor from '../components/CharacterEditor';

import { loadStateFromStorage } from '../data/localStorage';
import paths from '../data/paths';

import '../styles/EditBuilds.scss';
import { updateCharacters } from '../data/actions/characters';

export default function EditBuilds() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jsonString, setJsonString] = useState('');
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [characterData, setCharacterData] = useState({});

  // Get data from local storage
  useEffect(() => {
    const newJsonString = loadStateFromStorage(
      paths.localStorage.charactersJson,
      {},
      '',
    ).data;

    // Split into sets to enable editing in tabs with invalid data
    const jsonData = JSON.parse(newJsonString);

    setCharacterData(jsonData);
    setJsonString(newJsonString);
  }, []);

  // handlers
  const handleChangeJson = (e) => {
    setJsonString(e.target.value);

    try {
      const jsonData = JSON.parse(e.target.value);
      setCharacterData(jsonData);
      setJsonIsValid(true);
    } catch (error) {
      setJsonIsValid(false);
    }
  };

  const handleClickSave = () => {
    dispatch(updateCharacters(characterData));
    navigate('/genshin');
  };

  // render
  return (
    <Box
      className="EditBuilds page"
    >
      <h2>Edit Character Builds</h2>
      <span>
        The hoyo updater comes with just a few examples of builds.
        It is ultimately up to you to decide how you want to build your characters.
        Simply find the character below and set up the builds you want to use.
        <br />
        <br />
        After you&apos;ve set up your builds, please make sure to copy the data to a safe place.
        That way, you can restore it in case your browser cache is cleared.
        <br />
        <br />
        It is recommended to only select stats that are actually useful for the intended build:
        <br />
        hen you want to focus Bennett on healing, don’t select crit stats.
      </span>
      <Box className={`json ${jsonIsValid ? '' : 'error'}`}>
        <textarea
          value={jsonString}
          onChange={handleChangeJson}
        />
      </Box>
      {
        Object.keys(paths.character).map((characterName) => (
          <CharacterEditor
            key={characterName}
            characterName={characterName}
            characterBuilds={characterData[characterName]}
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
