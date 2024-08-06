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
  onClickOpenBuildOwner,
  onClickAddBuild,
  onClickDeleteBuild,
  onClickSetWearer,
  onClickToggleSet,
  onClickToggleMainstat,
  onClickToggleSubstat,
}) {
  // console.log(characterBuilds, wearerStates);

  if (!characterBuilds) {
    return null;
  }

  // disable the button if the owner is already occupied by another build
  const useOfOwner = wearerStates.busy.filter((b) => b.artifactWearer === buildOwner);
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
            build={b}
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
          character={buildOwner}
        />
        <h2>{ paths.character[buildOwner] }</h2>
        {
          canCreateBuild
            ? (
              <button
                className="addBuild primary"
                type="button"
                onClick={() => onClickAddBuild(buildOwner)}
                disabled={!canCreateBuild}
              >
                <span>+add build</span>
              </button>
            ) : (
              <>
                <span className="used">
                  {`This character currently wears the artifact set of ${useOfOwner[0].buildOwner}.`}
                </span>
                <button
                  className="unlock primary"
                  type="button"
                  onClick={() => onClickOpenBuildOwner(useOfOwner[0].buildOwner)}
                  alt="switch to build"
                >
                  <span>{`open ${useOfOwner[0].buildOwner}`}</span>
                </button>
              </>
            )
        }
      </Box>
    </div>
  );
}
