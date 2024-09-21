/* eslint-disable no-unused-vars */
import React from 'react';
import paths from '../data/paths';
// import '../styles/TheaterTeams.scss';

const ownedCharacters = [
  paths.character.Wanderer,
  paths.character.Faruzan,
  paths.character.Kazuha,
  paths.character.Xianyun,
  paths.character.Sucrose,
  paths.character.Sayu,
  paths.character.Yanfei,
  paths.character.Chevreuse,
  paths.character.Xiangling,
  paths.character.Bennett,
  paths.character.Mavuika,
  paths.character.Dehya,
  paths.character.Gaming,
  paths.character.Neuvillette,
  paths.character.Furina,
  paths.character.Mona,
  paths.character.SangonomiyaKokomi,
  paths.character.Yelan,
  paths.character.Xingqiu,
  paths.character.Candace,
  paths.character.Nilou,
  paths.character.Keqing,
  paths.character.Fischl,
  paths.character.Beidou,
  paths.character.KukiShinobu,
  paths.character.YaeMiko,
  paths.character.Lisa,
  paths.character.RaidenShogun,
  paths.character.Layla,
  paths.character.Kaeya,
  paths.character.Rosaria,
  paths.character.Charlotte,
  paths.character.Diona,
  paths.character.Nahida,
  'DMC',
  paths.character.Baizhu,
  paths.character.Collei,
  paths.character.Yaoyao,
  paths.character.Kirara,
  paths.character.Tighnari,
  paths.character.Noelle,
  paths.character.Gorou,
  paths.character.Ningguang,
  paths.character.Xilonen,
  paths.character.Navia,
  'GMC',
  paths.character.Kachina,
  paths.character.Zhongli,
];

const characterData = [
  {
    name: paths.character.Wanderer,
    element: 'anemo',
    role: 'onfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Faruzan,
    element: 'anemo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Kazuha,
    element: 'anemo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Xianyun,
    element: 'anemo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Sucrose,
    element: 'anemo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Sayu,
    element: 'anemo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Yanfei,
    element: 'pyro',
    role: 'onfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Chevreuse,
    element: 'pyro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Xiangling,
    element: 'pyro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Bennett,
    element: 'pyro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Mavuika,
    element: 'pyro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Dehya,
    element: 'pyro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Gaming,
    element: 'pyro',
    role: 'onfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Neuvillette,
    element: 'hydro',
    role: 'onfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Furina,
    element: 'hydro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Mona,
    element: 'hydro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.SangonomiyaKokomi,
    element: 'hydro',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Yelan,
    element: 'hydro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Xingqiu,
    element: 'hydro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Candace,
    element: 'hydro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Nilou,
    element: 'hydro',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Keqing,
    element: 'electro',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Fischl,
    element: 'electro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Beidou,
    element: 'electro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.KukiShinobu,
    element: 'electro',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.YaeMiko,
    element: 'electro',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Lisa,
    element: 'electro',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.RaidenShogun,
    element: 'electro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Layla,
    element: 'cryo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Kaeya,
    element: 'cryo',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Rosaria,
    element: 'cryo',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Charlotte,
    element: 'cryo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Diona,
    element: 'cryo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Nahida,
    element: 'dendro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: 'DMC',
    element: 'dendro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Baizhu,
    element: 'dendro',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Collei,
    element: 'dendro',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Yaoyao,
    element: 'dendro',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Kirara,
    element: 'dendro',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Tighnari,
    element: 'dendro',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Noelle,
    element: 'geo',
    role: 'onfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Gorou,
    element: 'geo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Ningguang,
    element: 'geo',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Xilonen,
    element: 'geo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Navia,
    element: 'geo',
    role: 'quickswap',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: 'GMC',
    element: 'geo',
    role: 'offfield',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Kachina,
    element: 'geo',
    role: 'buffer',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Zhongli,
    element: 'geo',
    role: 'sustain',
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
];

export default function TheaterTeams({ children }) {
  return (
    <div
      className="TheaterTeams"
    >
      {children}
    </div>
  );
}
