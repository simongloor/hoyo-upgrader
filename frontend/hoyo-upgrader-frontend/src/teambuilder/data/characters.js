import paths from '../../data/paths';

export default [
  {
    name: paths.character.Wanderer,
    element: 'anemo',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Faruzan,
        paths.character.Layla,
        paths.character.Bennett,
      ],
      likes: [
        paths.character.Zhongli,
        paths.character.Furina,
        paths.character.Yelan,
        paths.character.Xingqiu,
        paths.character.Beidou,
        paths.character.Fischl,
        paths.character.YaeMiko,
        paths.character.Kachina,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Faruzan,
    element: 'anemo',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.KaedeharaKazuha,
    element: 'anemo',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Xianyun,
    element: 'anemo',
    role: 'support',
    powerlevel: 3,
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
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Xiangling,
        paths.character.Bennett,
      ],
      likes: [
        paths.character.Kaeya,
        paths.character.Fischl,
        paths.character.SangonomiyaKokomi,
        paths.character.Rosaria,
        paths.character.Keqing,
        paths.character.Lisa,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Yanfei,
    element: 'pyro',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Bennett,
        paths.character.Yelan,
        paths.character.Xingqiu,
        paths.character.Sucrose,
      ],
      likes: [
        paths.character.Nahida,
        paths.character.Baizhu,
        paths.character.KaedeharaKazuha,
        paths.character.Beidou,
        paths.character.Lisa,
        paths.character.Rosaria,
        paths.character.Layla,
        paths.character.Kachina,
        paths.character.Charlotte,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Chevreuse,
    element: 'pyro',
    role: 'support',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Yanfei,
        paths.character.Fischl,
        paths.character.YaeMiko,
        paths.character.Lisa,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Xiangling,
    element: 'pyro',
    role: 'offfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Bennett,
        paths.character.Chevreuse,
      ],
      likes: [
        paths.character.RaidenShogun,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Bennett,
    element: 'pyro',
    role: 'support',
    powerlevel: 3,
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
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Kaeya,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Gaming,
    element: 'pyro',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Xianyun,
        paths.character.Furina,
        paths.character.Bennett,
      ],
      likes: [
        paths.character.Diona,
        paths.character.Rosaria,
        paths.character.Yelan,
        paths.character.KaedeharaKazuha,
        paths.character.Zhongli,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Neuvillette,
    element: 'hydro',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Furina,
        paths.character.Fischl,
        paths.character.Nahida,
        paths.character.RaidenShogun,
        paths.character.Dehya,
        paths.character.Sucrose,
        paths.character.KaedeharaKazuha,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Furina,
    element: 'hydro',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Charlotte,
        paths.character.Xianyun,
        paths.character.Baizhu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Mona,
    element: 'hydro',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Rosaria,
      ],
      likes: [
        paths.character.RaidenShogun,
        paths.character.Yanfei,
        paths.character.Neuvillette,
        paths.character.Navia,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.SangonomiyaKokomi,
    element: 'hydro',
    role: 'sustain',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Nilou,
        paths.character.Nahida,
      ],
      likes: [
        paths.character.Lisa,
        paths.character.Beidou,
        paths.character.Fischl,
        paths.character.Rosaria,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Yelan,
    element: 'hydro',
    role: 'offfield',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Yelan,
      ],
      likes: [
        paths.character.Xingqiu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Candace,
    element: 'hydro',
    role: 'offfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Yaoyao,
      ],
      likes: [
        paths.character.Beidou,
        paths.character.KukiShinobu,
        paths.character.Traveler,
        paths.character.Nahida,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Nilou,
    element: 'hydro',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Nahida,
      ],
      likes: [
        paths.character.Baizhu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Keqing,
    element: 'electro',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Fischl,
        paths.character.YaeMiko,
        paths.character.Xingqiu,
        paths.character.KaedeharaKazuha,
      ],
      likes: [
        paths.character.Collei,
        paths.character.Kirara,
        paths.character.Nahida,
        paths.character.Beidou,
        paths.character.Chevreuse,
        paths.character.Yelan,
        paths.character.Sayu,
        paths.character.SangonomiyaKokomi,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Fischl,
    element: 'electro',
    role: 'offfield',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Fischl,
      ],
      likes: [
        paths.character.Lisa,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.KukiShinobu,
    element: 'electro',
    role: 'sustain',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Fischl,
        paths.character.KukiShinobu,
        paths.character.Zhongli,
        paths.character.Nahida,
        paths.character.Baizhu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Lisa,
    element: 'electro',
    role: 'quickswap',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.YaeMiko,
        paths.character.Beidou,
        paths.character.Zhongli,
        paths.character.Dehya,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.RaidenShogun,
    element: 'electro',
    role: 'quickswap',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Xilonen,
        paths.character.KaedeharaKazuha,
        paths.character.Chevreuse,
        paths.character.Bennett,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Layla,
    element: 'cryo',
    role: 'sustain',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Yelan,
        paths.character.Xingqiu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Kaeya,
    element: 'cryo',
    role: 'offfield',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.SangonomiyaKokomi,
        paths.character.Xingqiu,
        paths.character.Mona,
        paths.character.Xiangling,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Rosaria,
    element: 'cryo',
    role: 'offfield',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Mona,
        paths.character.Xingqiu,
        paths.character.Yelan,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Diona,
    element: 'cryo',
    role: 'sustain',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Gaming,
      ],
      likes: [
        paths.character.Yanfei,
        paths.character.Kaeya,
        paths.character.Rosaria,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Nahida,
    element: 'dendro',
    role: 'quickswap',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.KukiShinobu,
        paths.character.RaidenShogun,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Traveler,
    element: 'dendro',
    role: 'offfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.KukiShinobu,
        paths.character.Nilou,
      ],
      likes: [
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Baizhu,
    element: 'dendro',
    role: 'sustain',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Nilou,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Yaoyao,
    element: 'dendro',
    role: 'sustain',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.KukiShinobu,
        paths.character.Nilou,
      ],
      likes: [
        paths.character.Xingqiu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Kirara,
    element: 'dendro',
    role: 'sustain',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Nilou,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Tighnari,
    element: 'dendro',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Fischl,
        paths.character.YaeMiko,
      ],
      likes: [
        paths.character.Lisa,
        paths.character.Beidou,
        paths.character.Nahida,
        paths.character.Baizhu,
        paths.character.Kirara,
        paths.character.KaedeharaKazuha,
        paths.character.Sucrose,
        paths.character.Sayu,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Noelle,
    element: 'geo',
    role: 'onfield',
    powerlevel: 3,
    mates: {
      needs: [
        paths.character.Furina,
        paths.character.KaedeharaKazuha,
      ],
      likes: [
        paths.character.Gorou,
        paths.character.Kachina,
        paths.character.Yelan,
        paths.character.Xingqiu,
        paths.character.Sucrose,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Gorou,
    element: 'geo',
    role: 'buffer',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Zhongli,
        paths.character.Xilonen,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Xilonen,
    element: 'geo',
    role: 'support',
    powerlevel: 3,
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
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [
        paths.character.Zhongli,
        paths.character.Furina,
        paths.character.Xianyun,
        paths.character.Wanderer,
        paths.character.Ningguang,
        paths.character.Xiangling,
        paths.character.Bennett,
        paths.character.Kachina,
        paths.character.Traveler,
        paths.character.Xilonen,
      ],
      hates: [],
    },
  },
  {
    name: paths.character.Kachina,
    element: 'geo',
    role: 'buffer',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
  {
    name: paths.character.Zhongli,
    element: 'geo',
    role: 'support',
    powerlevel: 3,
    mates: {
      needs: [],
      likes: [],
      hates: [],
    },
  },
];
