/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';

import Box from './Box';
import Character from './Character';
import Artifact from './Artifact';
import SubstatButton from './SubstatButton';

import '../styles/CharacterEditor.scss';

function CharacterBuild({ characterName, build }) {
  const handleClickSet = (setName) => {
  };
  const handleClickStatSands = (statCategory, statName) => {
  };
  const handleClickStatGoblet = (statCategory, statName) => {
  };
  const handleClickStatCirclet = (statCategory, statName) => {
  };
  const handleClickSubstat = (statCategory, statName) => {
  };
  const handleDeleteBuild = () => {
  };

  return (
    <Box>
      <div className="row header">
        <Character
          key={build}
          characterName={characterName}
        />
        <h2>{ paths.character[characterName] }</h2>
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
          <SubstatButton statName="enerRech_" onClick={handleClickStatSands} isActive={build.mainstats.sands.includes('enerRech_')} />
          <SubstatButton statName="atk_" onClick={handleClickStatSands} isActive={build.mainstats.sands.includes('atk_')} />
          <SubstatButton statName="hp_" onClick={handleClickStatSands} isActive={build.mainstats.sands.includes('hp_')} />
          <SubstatButton statName="def_" onClick={handleClickStatSands} isActive={build.mainstats.sands.includes('def_')} />
          <SubstatButton statName="eleMas" onClick={handleClickStatSands} isActive={build.mainstats.sands.includes('eleMas')} />
        </div>
      </div>
      <div className="row">
        <Artifact
          piece="goblet"
          set="generic"
        />
        <div className="column">
          <div className="statButtons elementalDmg row">
            <SubstatButton statName="electro_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('electro_dmg_')} />
            <SubstatButton statName="pyro_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('pyro_dmg_')} />
            <SubstatButton statName="cryo_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('cryo_dmg_')} />
            <SubstatButton statName="hydro_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('hydro_dmg_')} />
            <SubstatButton statName="anemo_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('anemo_dmg_')} />
            <SubstatButton statName="geo_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('geo_dmg_')} />
            <SubstatButton statName="physical_dmg_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('physical_dmg_')} />
          </div>
          <div className="statButtons row">
            <SubstatButton statName="atk_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('atk_')} />
            <SubstatButton statName="hp_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('hp_')} />
            <SubstatButton statName="def_" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('def_')} />
            <SubstatButton statName="eleMas" onClick={handleClickStatGoblet} isActive={build.mainstats.goblet.includes('eleMas')} />
          </div>
        </div>
      </div>
      <div className="row">
        <Artifact
          piece="circlet"
          set="generic"
        />
        <div className="statButtons row">
          <SubstatButton statName="critRate_" onClick={handleClickStatCirclet} isActive={build.substats.includes('critRate_')} />
          <SubstatButton statName="critDMG_" onClick={handleClickStatCirclet} isActive={build.substats.includes('critDMG_')} />
          <SubstatButton statName="atk_" onClick={handleClickStatCirclet} isActive={build.substats.includes('atk_')} />
          <SubstatButton statName="hp_" onClick={handleClickStatCirclet} isActive={build.substats.includes('hp_')} />
          <SubstatButton statName="def_" onClick={handleClickStatCirclet} isActive={build.substats.includes('def_')} />
          <SubstatButton statName="eleMas" onClick={handleClickStatCirclet} isActive={build.substats.includes('eleMas')} />
          <SubstatButton statName="heal_" onClick={handleClickStatCirclet} isActive={build.substats.includes('heal_')} />
        </div>
      </div>
      <span><strong>Substats</strong></span>
      <div className="statButtons row">
        <SubstatButton statName="critRate_" onClick={handleClickSubstat} isActive={build.substats.includes('critRate_')} />
        <SubstatButton statName="critDMG_" onClick={handleClickSubstat} isActive={build.substats.includes('critDMG_')} />
        <SubstatButton statName="enerRech_" onClick={handleClickSubstat} isActive={build.mainstats.circlet.includes('enerRech_')} />
        <SubstatButton statName="atk_" onClick={handleClickSubstat} isActive={build.mainstats.circlet.includes('atk_')} />
        <SubstatButton statName="hp_" onClick={handleClickSubstat} isActive={build.mainstats.circlet.includes('hp_')} />
        <SubstatButton statName="def_" onClick={handleClickSubstat} isActive={build.mainstats.circlet.includes('def_')} />
        <SubstatButton statName="eleMas" onClick={handleClickSubstat} isActive={build.mainstats.circlet.includes('eleMas')} />
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

export default function CharacterEditor({ characterName, characterBuilds }) {
  // handlers
  const handleClickAddBuild = () => {
  };

  // render
  return (
    <div
      className="CharacterEditor"
    >
      {
        characterBuilds && characterBuilds.map((b) => (
          <CharacterBuild
            key={b.substats.join('-')}
            characterName={characterName}
            build={b}
          />
        ))
      }
      <Box className="row right">
        <Character
          characterName={characterName}
        />
        <button
          className="addBuild primary"
          type="button"
          onClick={handleClickAddBuild}
        >
          <span>+add build</span>
        </button>
      </Box>
    </div>
  );
}
