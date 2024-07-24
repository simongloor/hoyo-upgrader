/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '../components/Box';

import artifactImg from '../theme/docu-artifact.png';
import statsImg from '../theme/docu-stats.png';
import '../styles/Documentation.scss';

export default function Documentation() {
  const navigate = useNavigate();
  return (
    <div
      className="Documentation page"
    >
      <Box>
        <h2>Documentation</h2>
        <span>
          <strong>Artifact Substats</strong>
          <br />
          <br />
          For a clean overview, the substats are only visualized as colorful segments.
          You can see the list of colors at the top of the page.
          <br />
          To see the exact substats of an artifact, you can click on it in the artifacts list.
        </span>
        <img src={statsImg} alt="Artifact Substats" />
        <span>
          <strong>Artifact Overview</strong>
          <br />
          <br />
          The first two tiles show the artifact and optionally the character who hasequipped it.
          <br />
          <br />
          The following groups show the different character/build who would like to have this
          artifact and the stats that it provides them with.
        </span>
        <ul>
          <li>
            Colorful segments are substat rolls.
          </li>
          <li>
            Gray segments of varying height are rolls you will get from leveling.
            Their height indicate the chance of rolling into a valuable stat.
          </li>
          <li>
            White crosses at the right side are rolls that have been wasted on bad substats.
          </li>
          <li>
            Gray crosses at the left are rolls that the character will never be able to obtain.
            This is when a character only needs a few types of substats and can’t make use of
            all 4 substat-slots.
          </li>
        </ul>
        <img src={artifactImg} alt="Artifact Overview" />
        <span>
          <strong>Artifact Quality</strong>
          <br />
          <br />
          The artifact list is sorted by the quality of the artifact.
          This is determined by the maximum potential rolls:
        </span>
        <ol>
          <li>
            The fewer wasted substats (white crosses) the better.
            Even if an artifact hasn’t reached lvl 20 yet.
          </li>
          <li>
            The higher the chance to gain useful substats, the better.
          </li>
          <li>
            The higher the level, the better.
          </li>
        </ol>
        <span>
          Since grey crosses are impossible to improve, they are counted as valuable rolls.
        </span>
        <span>
          <strong>Tiers</strong>
          <br />
          <br />
          The character overview shows tiers for the artifacts to help you evaluate what
          artifacts you might want to look at.
          The tiers are determined only by the amount of wasted substats.
          The exact values should help you recognize, that getting S-tier artifacts is
          highly unlikely,
          A-tier artifacts work very well, and B-tier artifacts indicate that you should
          think about spending a bit more time in a domain.
          <br />
          <br />
          Max. wasted substat rolls on feather, flower:
          <br />
          S: 2A: 4B: more
          <br />
          <br />
          Max. wasted substat rolls on sands, goblet, circlet:
          <br />
          S: 4A: moreB: more
        </span>
        <div className="right">
          <button
            className="primary"
            type="button"
            onClick={() => navigate('/')}
          >
            <span>return to main page</span>
          </button>
        </div>
      </Box>
    </div>
  );
}
