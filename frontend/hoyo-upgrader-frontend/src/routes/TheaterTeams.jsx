/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import paths from '../data/paths';
import TeamForceGraph from '../theaterTeams/components/TeamForceGraph';
import ElementSelection from '../theaterTeams/components/ElementSelection';
import TheaterSelection from '../theaterTeams/components/TheaterSelection';
// import '../styles/TheaterTeams.scss';

export default function TheaterTeams() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [filteredElements, setFilteredElements] = useState([
    'anemo',
    'geo',
    'electro',
    'hydro',
    'pyro',
    'cryo',
    'dendro',
  ]);

  return (
    <div
      className="TheaterTeams"
    >
      <ElementSelection
        onSelectElement={setSelectedElement}
      />
      <TheaterSelection
        selectedElement={selectedElement}
        onSelectElements={setFilteredElements}
      />
      <TeamForceGraph
        filteredElements={filteredElements}
      />
    </div>
  );
}
