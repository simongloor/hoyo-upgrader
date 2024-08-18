/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loadSettings, { disableStartTutorial } from '../data/actions/settings';

export default function useSettings() {
  const dispatch = useDispatch();

  const [activeTutorial, setActiveTutorial] = useState(false);
  const settings = useSelector((state) => state.settings);

  // Load settings at the beginning
  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  // Apply initial settings
  useEffect(() => {
    if (settings.isLoaded && settings.data.showTutorialOnStart) {
      setActiveTutorial(true);
    }
  }, [settings]);

  // Event handlers
  const handleSetTutorial = (newState) => {
    console.log('set tutorial', newState);
    setActiveTutorial(newState);

    if (!newState) {
      dispatch(disableStartTutorial());
    }
  };

  return {
    settings,
    activeTutorial,
    handleSetTutorial,
  };
}
