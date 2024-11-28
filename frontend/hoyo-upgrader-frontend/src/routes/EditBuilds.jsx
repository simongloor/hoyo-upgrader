/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';
import WindowActions from '../components/WindowActions';
import CharacterEditor from '../components/CharacterEditor';
import CharacterSelector from '../components/CharacterSelector';

import paths from '../data/paths';
import { loadStateFromStorage } from '../data/localStorage';
import { updateCharacters } from '../data/actions/characters';
import { getEmptyBuild } from '../data/characters';
import { getFreeArtifactWearer, getWearerStates } from '../data/builds';

import '../styles/EditBuilds.scss';

export default function EditBuilds() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buildData, setBuildData] = useState({ data: [], json: '' });
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState('Albedo');

  // Get data from local storage
  useEffect(() => {
    const newJsonString = loadStateFromStorage(
      paths.localStorage.charactersJson,
      {},
      '',
    ).data;
    const jsonData = JSON.parse(newJsonString);
    setBuildData({ data: jsonData, json: newJsonString });
  }, []);

  const wearerStates = getWearerStates(buildData.data);

  // handlers
  const handleChangeJson = (e) => {
    try {
      const jsonData = JSON.parse(e.target.value);
      setBuildData({ data: jsonData, json: e.target.value });
      setJsonIsValid(true);
    } catch (error) {
      setBuildData((state) => ({ ...state, json: e.target.value }));
      setJsonIsValid(false);
    }
  };

  const getNewEmptyBuild = (buildOwner) => {
    const newBuilds = [...buildData.data];
    const newBuild = getEmptyBuild();
    newBuild.buildOwner = buildOwner;
    newBuild.artifactWearer = getFreeArtifactWearer(wearerStates, buildData, buildOwner);
    return { newBuilds, newBuild };
  };

  // create and delete functions
  const handleCreateBuild = (buildOwner) => {
    const { newBuilds, newBuild } = getNewEmptyBuild(buildOwner);
    newBuilds.push(newBuild);
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };
  const handleCreatebuildFromPreset = (buildOwner, preset) => {
    // eslint-disable-next-line prefer-const
    let { newBuilds, newBuild } = getNewEmptyBuild(buildOwner);
    newBuild = { ...newBuild, ...preset };
    newBuilds.push(newBuild);
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };

  const handleDeleteBuild = (artifactWearer) => {
    // Make sure wearer exists
    if (!artifactWearer) return;

    // Remove build from data
    const newBuilds = [...buildData.data];
    const index = newBuilds.findIndex((b) => b.artifactWearer === artifactWearer);
    newBuilds.splice(index, 1);
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };

  const handleSetWearer = (oldWearer, newWearer) => {
    const newBuilds = [...buildData.data];
    const index = newBuilds.findIndex((b) => b.artifactWearer === oldWearer);
    newBuilds[index].artifactWearer = newWearer;
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };

  // toggle functions
  const handleToggleSet = (artifactWearer, setName) => {
    const newBuilds = [...buildData.data];
    const build = newBuilds.find((b) => b.artifactWearer === artifactWearer);
    if (build.sets.includes(setName)) {
      build.sets = build.sets.filter((set) => set !== setName);
    } else {
      build.sets.push(setName);
    }
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };
  const handleToggleMainstat = (artifactWearer, slot, stat) => {
    const newBuilds = [...buildData.data];
    const build = newBuilds.find((b) => b.artifactWearer === artifactWearer);
    if (build.mainstats[slot].includes(stat)) {
      build.mainstats[slot] = build.mainstats[slot].filter((s) => s !== stat);
    } else {
      build.mainstats[slot].push(stat);
    }
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };
  const handleToggleSubstat = (artifactWearer, stat) => {
    const newBuilds = [...buildData.data];
    const build = newBuilds.find((b) => b.artifactWearer === artifactWearer);
    if (build.substats.includes(stat)) {
      build.substats = build.substats.filter((s) => s !== stat);
    } else {
      build.substats.push(stat);
    }
    setBuildData({ data: newBuilds, json: JSON.stringify(newBuilds, null, 2) });
  };

  const handleClickSave = () => {
    dispatch(updateCharacters(buildData));
    navigate('/genshin');
  };

  // console.log(characterData.byOwner);

  // render
  return (
    <div
      className="EditBuilds page"
    >
      <Box>
        <h2>Edit Character Builds</h2>
        <span>
          The hoyo updater comes with just a few examples of builds.
          It is ultimately up to you to decide how you want to build your characters.
          <br />
          <br />
          After you&apos;ve set up your builds, please make sure to copy this data to a safe place.
          That way, you can restore it in case your browser cache is cleared:
        </span>
        <Box className={`json ${jsonIsValid ? '' : 'error'}`}>
          <textarea
            value={buildData.json}
            onChange={handleChangeJson}
          />
        </Box>
        <Box className="characterSelection">
          <h2>Select a Character</h2>
          <span>Choose the character that the build is meant for.</span>
          <CharacterSelector
            selectedCharacter={selectedCharacter}
            onClick={setSelectedCharacter}
            inactiveCharacters={wearerStates.withoutOwnBiuld}
            // inactiveCharacters={getBusyArtifactWearers(wearerStates, selectedCharacter)}
          />
        </Box>
        <CharacterEditor
          key={selectedCharacter}
          buildOwner={selectedCharacter}
          characterBuilds={buildData.data.filter((b) => b.buildOwner === selectedCharacter)}
          wearerStates={wearerStates}
          onClickOpenBuildOwner={setSelectedCharacter}
          onClickAddBuild={handleCreateBuild}
          onClickAddRecommendedBuild={handleCreatebuildFromPreset}
          onClickDeleteBuild={handleDeleteBuild}
          onClickSetWearer={handleSetWearer}
          onClickToggleSet={handleToggleSet}
          onClickToggleMainstat={handleToggleMainstat}
          onClickToggleSubstat={handleToggleSubstat}
        />
        <div className="return">
          <WindowActions
            onClickCancel={() => navigate('/genshin')}
            onClickSave={handleClickSave}
            isValid
          />
        </div>
      </Box>
    </div>
  );
}
