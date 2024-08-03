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
import { getWearerStates, sortBuildsByOwner, sortBuildsByWearer } from '../data/builds';

export default function EditBuilds() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jsonString, setJsonString] = useState('');
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [characterData, setCharacterData] = useState({
    byWearer: {},
    byOwner: {},
  });

  const setCharacterDataByWearer = (newDataByWearer) => {
    const byOwner = sortBuildsByOwner(newDataByWearer);
    setCharacterData({
      byWearer: newDataByWearer,
      byOwner,
    });
    setJsonString(JSON.stringify(newDataByWearer, null, 2));
  };
  const setCharacterDataByOwner = (newDataByOwner) => {
    const byWearer = sortBuildsByWearer(newDataByOwner);
    setCharacterData({
      byWearer,
      byOwner: newDataByOwner,
    });
    setJsonString(JSON.stringify(byWearer, null, 2));
  };

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

  const wearerStates = getWearerStates(characterData.byOwner);

  // handlers
  const handleChangeJson = (e) => {
    setJsonString(e.target.value);

    try {
      const jsonData = JSON.parse(e.target.value);
      setCharacterDataByWearer(jsonData);
      setJsonIsValid(true);
    } catch (error) {
      setJsonIsValid(false);
    }
  };

  // create and delete functions
  const handleCreateBuild = (buildOwner) => {
    const newDataByOwner = { ...characterData.byOwner };
    if (!newDataByOwner[buildOwner]) {
      newDataByOwner[buildOwner] = [];
    }
    const newBuild = getEmptyBuild();
    console.log(wearerStates.free);
    newBuild.artifactWearer = newDataByOwner[buildOwner].length === 0
      ? buildOwner
      : wearerStates.free[0];
    newDataByOwner[buildOwner].push(newBuild);
    setCharacterDataByOwner(newDataByOwner);
  };
  const handleDeleteBuild = (buildOwner, index) => {
    const newDataByWearer = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    delete newDataByWearer[artifactWearer];
    setCharacterDataByWearer(newDataByWearer);
  };
  const handleSetWearer = (buildOwner, index, newWearer) => {
    const newDataByWearer = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    newDataByWearer[newWearer] = newDataByWearer[artifactWearer];
    delete newDataByWearer[artifactWearer];
    setCharacterDataByWearer(newDataByWearer);
  };

  // toggle functions
  const handleToggleSet = (buildOwner, index, setName) => {
    const newDataByWearer = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newDataByWearer[artifactWearer];
    if (build.sets.includes(setName)) {
      build.sets = build.sets.filter((set) => set !== setName);
    } else {
      build.sets.push(setName);
    }
    setCharacterDataByWearer(newDataByWearer);
  };
  const handleToggleMainstat = (buildOwner, index, slot, stat) => {
    const newDataByWearer = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newDataByWearer[artifactWearer];
    if (build.mainstats[slot].includes(stat)) {
      build.mainstats[slot] = build.mainstats[slot].filter((s) => s !== stat);
    } else {
      build.mainstats[slot].push(stat);
    }
    setCharacterDataByWearer(newDataByWearer);
  };
  const handleToggleSubstat = (buildOwner, index, stat) => {
    const newDataByWearer = { ...characterData.byWearer };
    const { artifactWearer } = characterData.byOwner[buildOwner][index];
    const build = newDataByWearer[artifactWearer];
    if (build.substats.includes(stat)) {
      build.substats = build.substats.filter((s) => s !== stat);
    } else {
      build.substats.push(stat);
    }
    setCharacterDataByWearer(newDataByWearer);
  };

  const handleClickSave = () => {
    dispatch(updateCharacters(characterData));
    navigate('/genshin');
  };

  // console.log(characterData.byOwner);

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
            characterBuilds={characterData.byOwner[buildOwner] || []}
            wearerStates={wearerStates}
            onClickAddBuild={handleCreateBuild}
            onClickDeleteBuild={handleDeleteBuild}
            onClickSetWearer={handleSetWearer}
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
