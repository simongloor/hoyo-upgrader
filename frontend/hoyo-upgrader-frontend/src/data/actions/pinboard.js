export default function togglePinnedArtifact(artifactData) {
  return ({
    type: 'TOGGLE_PINNED_ARTIFACT',
    payload: { artifactData },
  });
}
