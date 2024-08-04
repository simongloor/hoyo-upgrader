/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';
import { possibleStats } from '../data/substats';

import Box from './Box';
import Character from './Character';
import Artifact from './Artifact';
import SubstatButton from './SubstatButton';

export default function CharacterBuildEditor({
  build,
  wearerStates,
  onClickDeleteBuild,
  onClickSetWearer,
  onClickToggleSet,
  onClickToggleMainstat,
  onClickToggleSubstat,
}) {
  // console.log(build);
  const handleClickWearer = (newWearer) => {
    onClickSetWearer(build.artifactWearer, newWearer);
  };
  const handleClickSet = (setName) => {
    onClickToggleSet(build.artifactWearer, setName);
  };
  const handleClickMainStat = (statCategory, statName) => {
    onClickToggleMainstat(build.artifactWearer, statCategory, statName);
  };
  const handleClickSubstat = (statName) => {
    onClickToggleSubstat(build.artifactWearer, statName);
  };
  const handleDeleteBuild = () => {
    onClickDeleteBuild(build.buildWearer);
  };

  // console.log(build.buildOwner, build.artifactWearer);

  // render
  return (
    <Box>
      <div className="row header">
        <Character
          key={build}
          character={build.buildOwner}
        />
        <h2>{ paths.character[build.buildOwner] }</h2>
      </div>
      <span><strong>Wearer</strong></span>
      <span>A second build can be equipped on a character that you don&apos;t currently play.</span>
      <div className="wearers row">
        {
          Object.keys(paths.character).map((characterName) => (
            <Character
              key={characterName}
              character={characterName}
              onClick={() => handleClickWearer(characterName)}
              inactive={
                characterName !== build.artifactWearer
              }
              disabled={
                characterName !== build.artifactWearer
                && !wearerStates.free.includes(characterName)
              }
            />
          ))
        }
      </div>
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
        onClick={handleDeleteBuild}
      >
        <span>delete build</span>
      </button>
    </Box>
  );
}