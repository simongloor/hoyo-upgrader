/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';

import Box from './Box';
import Character from './Character';
import CharacterBuildEditor from './CharacterBuildEditor';

import '../styles/CharacterEditor.scss';

export default function CharacterEditor({
  buildOwner,
  characterBuilds,
  onClickAddBuild,
  onClickDeleteBuild,
  onClickToggleSet,
  onClickToggleMainstat,
  onClickToggleSubstat,
}) {
  // console.log(characterBuilds);

  // render
  return (
    <div
      className="CharacterEditor"
    >
      {
        characterBuilds && characterBuilds.map((b, i) => (
          <CharacterBuildEditor
            key={b.artifactWearer}
            buildOwner={buildOwner}
            build={b}
            index={i}
            onClickDeleteBuild={onClickDeleteBuild}
            onClickToggleSet={onClickToggleSet}
            onClickToggleMainstat={onClickToggleMainstat}
            onClickToggleSubstat={onClickToggleSubstat}
          />
        ))
      }
      <Box className="row right">
        <Character
          characterName={buildOwner}
        />
        <h2>{ paths.character[buildOwner] }</h2>
        <button
          className="addBuild primary"
          type="button"
          onClick={() => onClickAddBuild(buildOwner)}
        >
          <span>+add build</span>
        </button>
      </Box>
    </div>
  );
}
