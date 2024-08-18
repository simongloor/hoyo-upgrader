/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';

import playIcon from '../theme/play_circle.svg';
import '../styles/TutorialPage.scss';

export default function TutorialPage({
  img,
  video,
  title,
  paragraphs,
  forceVideo,
}) {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <div
      className="TutorialPage"
    >
      <div className="visual">
        {
          showVideo || forceVideo ? (
            <iframe
              width="730"
              height="410"
              src={video}
              // src={`${video}&amp;controls=0`
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          ) : (
            <button
              className="media"
              type="button"
              onClick={() => setShowVideo(true)}
            >
              <img className="still" src={img} alt="" />
              <img className="play" src={playIcon} alt="play" />
            </button>
          )
        }
      </div>
      <div className="content">
        <h6>{title}</h6>
        <div className="description">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
