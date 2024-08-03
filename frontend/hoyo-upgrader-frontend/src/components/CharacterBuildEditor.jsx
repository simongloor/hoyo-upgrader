/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';
import { possibleStats } from '../data/substats';

import Box from './Box';
import Character from './Character';
import Artifact from './Artifact';
import SubstatButton from './SubstatButton';

export default function CharacterBuildEditor({
  buildOwner,
  build,
  index,
  onClickDeleteBuild,
  onClickSetWearer,
  onClickToggleSet,
  onClickToggleMainstat,
  onClickToggleSubstat,
}) {
  // console.log(build);
  const handleClickWearer = (characterName) => {
    onClickSetWearer(buildOwner, index, characterName);
  }
  const handleClickSet = (setName) => {
    onClickToggleSet(buildOwner, index, setName);
  };
  const handleClickMainStat = (statCategory, statName) => {
    onClickToggleMainstat(buildOwner, index, statCategory, statName);
  };
  const handleClickSubstat = (statName) => {
    onClickToggleSubstat(buildOwner, index, statName);
  };

  // render
  return (
    <Box>
      <div className="row header">
        <Character
          key={build}
          characterName={buildOwner}
        />
        <h2>{ paths.character[buildOwner] }</h2>
      </div>
      <span><strong>Wearer</strong></span>
      <span>A second build can be equipped on a character that you don&apos;t currently play.</span>
      {
        Object.keys(paths.character).map((characterName) => (
          <button
            key={characterName}
            className={`character ${characterName} ${build.artifactWearer === characterName ? 'active' : 'inactive'}`}
            type="button"
            onClick={() => handleClickWearer(characterName)}
            alt={characterName}
          >
            <Character
              characterName={characterName}
            />
          </button>
        ))
      }
      <span><strong>Sets</strong></span>
      <div className="artifacts row">
        {
          Object.keys(paths.set).map((setName) => (
            <button
              key={setName}
              className={`artifact ${setName} ${build.sets.includes(setName) ? 'active' : 'inactive'}`}
              type="button"
              onClick={() => handleClickSet(setName)}
              alt={setName}
            >
              <Artifact
                piece="flower"
                set={setName}
              />
            </button>
          ))
        }
      </div>
      <span><strong>MainStats</strong></span>
      <div className="row">
        <Artifact
          piece="sands"
          set="generic"
        />
        <div className="statButtons row">
          {
            possibleStats.sands.map((statName) => (
              <SubstatButton
                key={statName}
                statName={statName}
                onClick={() => handleClickMainStat('sands', statName)}
                isActive={build.mainstats.sands.includes(statName)}
              />
            ))
          }
        </div>
      </div>
      <div className="row">
        <Artifact
          piece="goblet"
          set="generic"
        />
        <div className="column">
          <div className="statButtons elementalDmg row">
            {
              possibleStats.gobletDmg.map((statName) => (
                <SubstatButton
                  key={statName}
                  statName={statName}
                  onClick={() => handleClickMainStat('goblet', statName)}
                  isActive={build.mainstats.goblet.includes(statName)}
                />
              ))
            }
          </div>
          <div className="statButtons row">
            {
              possibleStats.gobletPrimary.map((statName) => (
                <SubstatButton
                  key={statName}
                  statName={statName}
                  onClick={() => handleClickMainStat('goblet', statName)}
                  isActive={build.mainstats.goblet.includes(statName)}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className="row">
        <Artifact
          piece="circlet"
          set="generic"
        />
        <div className="statButtons row">
          {
            possibleStats.circlet.map((statName) => (
              <SubstatButton
                key={statName}
                statName={statName}
                onClick={() => handleClickMainStat('circlet', statName)}
                isActive={build.mainstats.circlet.includes(statName)}
              />
            ))
          }
        </div>
      </div>
      <span><strong>Substats</strong></span>
      <div className="statButtons row">
        {
          possibleStats.substat.map((statName) => (
            <SubstatButton
              key={statName}
              statName={statName}
              onClick={() => handleClickSubstat(statName)}
              isActive={build.substats.includes(statName)}
            />
          ))
        }
      </div>
      <button
        className="deleteBuild secondary"
        type="button"
        onClick={() => onClickDeleteBuild(
          buildOwner,
          index,
        )}
      >
        <span>delete build</span>
      </button>
    </Box>
  );
}
