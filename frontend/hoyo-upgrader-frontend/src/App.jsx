import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './routes/Home';
import Documentation from './routes/Documentation';
import ImportArtifacts from './routes/ImportArtifacts';
import EditBuilds from './routes/EditBuilds';
import TheaterTeams from './routes/TheaterTeams';
import AbyssTeams from './routes/AbyssTeams';

import paths from './data/paths';
import abyssStore from './abyssTeams/data/reducers/store';
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
        element={(
          <Provider store={abyssStore}>
            <AbyssTeams />
          </Provider>
        )}
      />
    </Routes>
  );
}

export default App;
