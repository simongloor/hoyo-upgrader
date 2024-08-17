import React from 'react';

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
export default [
  {
    label: 'Importing artifacts',
    pages: [
      {
        title: 'Scanning Artifacts',
        paragraphs: [
          <>Artifacts can be scanned with regular Genshin Scanners.<br />For example: You can record your inventory using <a href="https://obsproject.com/" target="_blank" rel="noreferrer">OBS</a> and upload it to <a href="https://artiscan.ninjabay.org/#/artifacts/help" target="_blank" rel="noreferrer">Artiscan</a>.</>,
        ],
        img: '/genshin/tutorials/artiscan.jpg',
        video: 'https://www.youtube.com/embed/BZNH3r3Nias?si=EyrcAF9ZxL2wznea',
      }, {
        title: 'Importing Artifacts',
        paragraphs: [
          'Open the import menu, copy the data into the text field and click on save.',
          'You can also scan only artifacts of a specific set. To update them, first select the set and then paste the data.',
        ],
        img: '/genshin/tutorials/artifact-import.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Editing builds',
    pages: [
      {
        title: 'Creating a build',
        paragraphs: [
          'Open the Build editor, select a character and click on [+add build]. You can then select all sets, mainstats and substats that are valuable to the character. ',
          'Only choose the stats that are actually needed. E.g. don’t just select everything on Bennett: Should he heal or do damage?',
        ],
        img: '/genshin/tutorials/create-build.jpg',
        video: '',
      }, {
        title: 'Multiple builds for a character',
        paragraphs: [
          'You can create additional builds for a character. To track the artifacts, you need to select a character as the wearer of the set in the Upgrader and equipp the artifact in the game. Scan and update your artifacts to apply the changes to the Upgrader.',
        ],
        img: '/genshin/tutorials/artifact-wearer.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Substats',
    pages: [
      {
        title: 'Regular substats',
        paragraphs: [
          'The substats of artifacts are shown for each build. Only the substats that are of value to the build are displayed. Flat stats are ignored, since either % stats or other stats are preferrable.',
        ],
        img: '/genshin/tutorials/substats.jpg',
        video: '',
      }, {
        title: 'Wasted stats',
        paragraphs: [
          'The Upgrader judges the quality of an upgrade by the number of wasted stats: the stats that a build doesn’t need. Wasted stats are displayed as white crosses on the right side.',
        ],
        img: '/genshin/tutorials/substats.jpg',
        video: '',
      }, {
        title: 'Impossible substats',
        paragraphs: [
          'Many builds won’t make use of all substat slots. For example, Kuki Shinobu needs an EM sands with HP% as substats, anything else has little impact and is wasted.',
          'The number of substat rolls that will always be wasted is displayed as grey crosses on the left side.',
        ],
        img: '/genshin/tutorials/substats.jpg',
        video: '',
      }, {
        title: 'Missing substats',
        paragraphs: [
          'Artifacts that are not at max level can gain more substat rolls. These rolls are shown in grey. The height of the bar shows the chance of the artifact to reach that number of substats.',
          'When a substat slot is still missing, the Upgrader assumes that it will roll into something useful (if possible). That way, you see the max potential of the artifact.',
        ],
        img: '/genshin/tutorials/substats-missing.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Characters',
    pages: [
      {
        title: 'Character Overview',
        paragraphs: [
          'In the character overview, you can see all builds. The substats of all artifacts are accumulated. The number on the right and the numbers on the artifacts show how many wasted substats are remaining.',
          'You can click on the characters image to add the character to the filter.',
        ],
        img: '/genshin/tutorials/character-overview.jpg',
        video: '',
      }, {
        title: 'Builds by Artifacts',
        paragraphs: [
          'The builds that can make use of an artifact are also listed alongside the artifact. The displayed substats are different for each build, since every build needs different substats.',
          'The number with the arrow shows the possible improvement a character can gain when all rolls succeed. E.g. 2 means the artifact will have 2 more valuable substats than the currently equipped artifact.',
          'currently equipped artifact. Builds are greyed out on artifacts that provide exactly the same number of substats.',
        ],
        img: '/genshin/tutorials/build-value.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Artifacts',
    pages: [
      {
        title: 'Artifacts',
        paragraphs: [
          'The number at the bottom right is the biggest upgrade the artifact can provide to any build. If there is no upgrade, a trashcan is displayed instead.',
          'The number at the bottom left is the level of the artifact.',
          'All artifacts that are currently equipped, show the wearer on the left side.',
        ],
        img: '/genshin/tutorials/artifacts.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Filters',
    pages: [
      {
        title: 'Filters',
        paragraphs: [
          'By selecting a specific set, you will only see artifacts of the set and characters that make use of it.',
          'Selecting a character also limits the sets displayed and reorders the artifacts by value for the character.',
          'While a specific piece is selected, you have the option to only show artifacts with a specific mainstat.',
          'You can always enable offpieces and show artifacts and builds independent from any sets.',
        ],
        img: '/genshin/tutorials/filter.jpg',
        video: '',
      },
    ],
  }, {
    label: 'Recommendations',
    pages: [
      {
        title: 'Recommendations',
        paragraphs: [
          <>To help you with managing hundreds of artifacts, the recommendations help you find both amazing and trash artifacts. <strong>Please do not blindly follow the recommended actions.</strong></>,
        ],
        img: '/genshin/tutorials/recommendations.jpg',
        video: '',
      }, {
        title: 'Artifact types',
        paragraphs: [
          'Recommendations group the found artifacts by type. Flower, feather, sands and circlet are grouped by set and mainstat. Goblet is only grouped by mainstat (offpieces).',
          'Click on a group to apply the necessary filters.',
        ],
        img: '/genshin/tutorials/recommendation.jpg',
        video: '',
      }, {
        title: 'Finding the artifacts',
        paragraphs: [
          'The artifacts that were identified by the recommendation are highlighted in the list.',
        ],
        img: '/genshin/tutorials/recommended.jpg',
        video: '',
      },
    ],
  },
];
