import React from 'react';
import { Routes, Route } from 'react-router-dom';

import paths from './data/paths';

import Home from './routes/Home';
import Documentation from './routes/Documentation';
import ImportArtifacts from './routes/ImportArtifacts';
import EditBuilds from './routes/EditBuilds';

import './styles/App.scss';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home />}
      />
      <Route
        exact
        path={`/${paths.DOCUMENTATION}`}
        element={<Documentation />}
      />
      <Route
        exact
        path={`/${paths.IMPORT_ARTIFACTS}`}
        element={<ImportArtifacts />}
      />
      <Route
        exact
        path={`/${paths.EDIT_BUILDS}`}
        element={<EditBuilds />}
      />
    </Routes>
  );
}

export default App;
