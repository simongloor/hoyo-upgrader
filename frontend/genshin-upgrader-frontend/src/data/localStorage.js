export const getDefaultLocalStorageState = () => (
  {
    data: [],
    isSuccess: false,
  }
);

export function loadStateFromStorage(key, state, defaultValue) {
  const newState = { ...state };

  // Get local data
  const localDataString = localStorage.getItem(key);

  // Missing?
  if (localDataString === null || localDataString === 0) {
    newState.data = defaultValue;
    return newState;
  }

  newState.data = JSON.parse(localDataString);
  return newState;
}

export function saveStateToStorage(key, state) {
  localStorage.setItem(
    key,
    JSON.stringify(state.data),
  );
}
