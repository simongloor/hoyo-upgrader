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
  wearerStates,
  onClickAddBuild,
  onClickDeleteBuild,
  onClickSetWearer,
  onClickToggleSet,
  onClickToggleMainstat,
  onClickToggleSubstat,
}) {
  // console.log(characterBuilds);

  if (!characterBuilds) {
    return null;
  }

  // disable the button if the owner is already occupied by another build
  const useOfOwner = characterBuilds.filter((b) => b.artifactWearer === buildOwner);
  const canCreateBuild = characterBuilds.length > 0 || useOfOwner.length === 0;

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
            wearerStates={wearerStates}
            onClickDeleteBuild={onClickDeleteBuild}
            onClickSetWearer={onClickSetWearer}
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
          disabled={!canCreateBuild}
        >
          <span>+add build</span>
        </button>
        {
          !canCreateBuild && (
            <span className="used">
              This character currently wears the artifact set of
              {wearerStates.busy.find((w) => w.wearer === buildOwner).buildOwner}
              .
            </span>
          )
        }
      </Box>
    </div>
  );
}
