/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/QualitySection.scss';

export default function QualitySection({
  label,
  withSpacer,
  withTile = true,
}) {
  return (
    <div
      className={`QualitySection ${withSpacer ? 'withSpacer' : ''} ${withTile ? 'withTile' : ''}`}
    >
      <span>{label}</span>
    </div>
  );
}
