/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/WindowActions.scss';

export default function WindowActions({ onClickCancel, onClickSave }) {
  return (
    <div
      className="WindowActions"
    >
      <button
        className="secondary"
        type="button"
        onClick={onClickCancel}
      >
        <span>cancel</span>
      </button>
      <button
        className="primary"
        type="button"
        onClick={onClickSave}
      >
        <span>save & close</span>
      </button>
    </div>
  );
}
