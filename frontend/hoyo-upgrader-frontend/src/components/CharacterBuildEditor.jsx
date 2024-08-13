/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';
import { possibleStats } from '../data/substats';

import Box from './Box';
import Character from './Character';
import Artifact from './Artifact';
import SubstatButton from './SubstatButton';
import CharacterSelector from './CharacterSelector';
import { getBusyArtifactWearers } from '../data/builds';

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
    <Box className="CharacterBuildEditor">
      <div className="row header">
        <Character
          key={build}
          character={build.buildOwner}
        />
        <h2>{ paths.character[build.buildOwner] }</h2>
      </div>
      <span><strong>Wearer</strong></span>
      <span>
        Choose the character that currently wears the artifacts.
        If you have multiple builds for a character or you don&apos;t own a character,
        you can equip the artifacts on an other character.
      </span>
      <Box>
        <CharacterSelector
          selectedCharacter={build.artifactWearer}
          disabledCharacters={getBusyArtifactWearers(wearerStates, build.artifactWearer)}
          onClick={handleClickWearer}
        />
      </Box>
      <span><strong>Sets</strong></span>
      <span>
        Select all sets that you consider using for this build.
      </span>
      <Box>
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
      </Box>
      <span><strong>MainStats</strong></span>
      <span>Select the desired mainstats for sands, goblet and circlet.</span>
      <Box>
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
      </Box>
      <span><strong>Substats</strong></span>
      <span>
        Select all substats that you consider valuable.
        It is recommended to skip &quot;nice to have&quot; stats.
        Focus on the stats that are essential for the build.
      </span>
      <Box>
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
      </Box>
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
