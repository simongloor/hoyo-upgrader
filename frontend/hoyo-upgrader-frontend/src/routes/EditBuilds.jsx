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
import { getEmptyBuild } from '../data/characters';
import { sortBuildsByOwner } from '../data/builds';

export default function EditBuilds() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jsonString, setJsonString] = useState('');
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [characterData, setCharacterData] = useState({
    byWearer: {},
    byOwner: {},
  });

  // Get data from local storage
  useEffect(() => {
    const newJsonString = loadStateFromStorage(
      paths.localStorage.charactersJson,
      {},
      '',
    ).data;
    setJsonString(newJsonString);

    const jsonData = JSON.parse(newJsonString);
    const byOwner = sortBuildsByOwner(jsonData);

    setCharacterData({
      byWearer: jsonData,
      byOwner,
    });
  }, []);

  // handlers
  const handleChangeJson = (e) => {
    setJsonString(e.target.value);

    try {
      const jsonData = JSON.parse(e.target.value);
      const byOwner = sortBuildsByOwner(jsonData);
      setCharacterData({
        byWearer: jsonData,
        byOwner,
      });
      setJsonIsValid(true);
    } catch (error) {
      setJsonIsValid(false);
    }
  };
  console.log(characterData);

  const handleCreateBuild = (buildOwner) => {
    const newCharacterData = { ...characterData.byWearer };
    if (!newCharacterData[buildOwner]) {
      newCharacterData[buildOwner] = [];
    }
    newCharacterData[buildOwner].push(getEmptyBuild());
    setCharacterData(newCharacterData);
  };
  const handleDeleteBuild = (buildOwner, index) => {
    const newCharacterData = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    delete newCharacterData[artifactWearer];
    setCharacterData(newCharacterData);
  };

  const handleToggleSet = (buildOwner, index, setName) => {
    const newCharacterData = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newCharacterData[artifactWearer];
    if (build.sets.includes(setName)) {
      build.sets = build.sets.filter((set) => set !== setName);
    } else {
      build.sets.push(setName);
    }
    setCharacterData(newCharacterData);
  };
  const handleToggleMainstat = (buildOwner, index, slot, stat) => {
    // console.log(index);
    const newCharacterData = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newCharacterData[artifactWearer];
    if (build.mainstats[slot].includes(stat)) {
      build.mainstats[slot] = build.mainstats[slot].filter((s) => s !== stat);
    } else {
      build.mainstats[slot].push(stat);
    }
    setCharacterData(newCharacterData);
  };
  const handleToggleSubstat = (buildOwner, index, stat) => {
    const newCharacterData = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newCharacterData[artifactWearer];
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
        Object.keys(paths.character).map((buildOwner, i) => (
          <CharacterEditor
            key={buildOwner}
            buildOwner={buildOwner}
            characterBuilds={characterData.byOwner[buildOwner]}
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
