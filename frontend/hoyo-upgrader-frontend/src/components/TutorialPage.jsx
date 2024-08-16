/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
// import '../styles/TutorialPage.scss';

export default function TutorialPage({
  img,
  video,
  title,
  paragraphs,
}) {
  return (
    <div
      className="TutorialPage"
    >
      <div className="visual">
        <a href={video} target="_blank" rel="noreferrer">
          <img src={img} alt="" />
          play
        </a>
      </div>
      <h6>{title}</h6>
      <div className="content">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
