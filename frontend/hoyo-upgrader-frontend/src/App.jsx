import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import paths from './data/paths';

import Home from './routes/Home';
import Documentation from './routes/Documentation';
import ImportArtifacts from './routes/ImportArtifacts';
import EditBuilds from './routes/EditBuilds';
import TheaterTeams from './routes/TheaterTeams';
import AbyssTeams from './routes/AbyssTeams';

import './styles/App.scss';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to="/genshin/" />}
      />
      <Route
        exact
        path="/genshin/"
        element={<Home />}
      />
      <Route
        exact
        path={`/genshin/${paths.DOCUMENTATION}`}
        element={<Documentation />}
      />
      <Route
        exact
        path={`/genshin/${paths.IMPORT_ARTIFACTS}`}
        element={<ImportArtifacts />}
      />
      <Route
        exact
        path={`/genshin/${paths.EDIT_BUILDS}`}
        element={<EditBuilds />}
      />
      <Route
        exact
        path="/genshin/theater/teams"
        element={<TheaterTeams />}
      />
      <Route
        exact
        path="/genshin/abyss/teams"
        element={<AbyssTeams />}
      />
    </Routes>
  );
}

export default App;
