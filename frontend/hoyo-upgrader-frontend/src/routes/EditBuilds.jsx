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
import { getBuildIndex, getEmptyBuild } from '../data/characters';

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

  const handleCreateBuild = (characterName) => {
    const newCharacterData = { ...characterData };
    if (!newCharacterData[characterName]) {
      newCharacterData[characterName] = [];
    }
    newCharacterData[characterName].push(getEmptyBuild());
    setCharacterData(newCharacterData);
  };
  const handleDeleteBuild = (characterName, index) => {
    const newCharacterData = { ...characterData };
    // const index = getBuildIndex(newCharacterData, characterName, index);
    newCharacterData[characterName].splice(index, 1);
    setCharacterData(newCharacterData);
  };

  const handleToggleSet = (characterName, index, setName) => {
    const newCharacterData = { ...characterData };
    // const index = getBuildIndex(newCharacterData, characterName, index);
    const build = newCharacterData[characterName][index];
    if (build.sets.includes(setName)) {
      build.sets = build.sets.filter((set) => set !== setName);
    } else {
      build.sets.push(setName);
    }
    setCharacterData(newCharacterData);
  };
  const handleToggleMainstat = (characterName, index, slot, stat) => {
    // console.log(index);
    const newCharacterData = { ...characterData };
    // const index = getBuildIndex(newCharacterData, characterName, index);
    const build = newCharacterData[characterName][index];
    if (build.mainstats[slot].includes(stat)) {
      build.mainstats[slot] = build.mainstats[slot].filter((s) => s !== stat);
    } else {
      build.mainstats[slot].push(stat);
    }
    setCharacterData(newCharacterData);
  };
  const handleToggleSubstat = (characterName, index, stat) => {
    const newCharacterData = { ...characterData };
    // const index = getBuildIndex(newCharacterData, characterName, index);
    const build = newCharacterData[characterName][index];
    if (build.substats.includes(stat)) {
      build.substats = build.substats.filter((s) => s !== stat);
    } else {
      build.substats.push(stat);
    }
    setCharacterData(newCharacterData);
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
        Object.keys(paths.character).map((characterName, i) => (
          <CharacterEditor
            key={characterName}
            characterName={characterName}
            characterBuilds={characterData[characterName]}
            onClickAddBuild={handleCreateBuild}
            onClickDeleteBuild={handleDeleteBuild}
            onClickToggleSet={handleToggleSet}
            onClickToggleMainstat={handleToggleMainstat}
            onClickToggleSubstat={handleToggleSubstat}
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
