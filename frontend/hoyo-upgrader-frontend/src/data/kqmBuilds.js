/* eslint-disable no-unused-vars */

// strong type to avoid typos
const er = 'enerRech_';
const atk = 'atk_';
const hp = 'hp_';
const def = 'def_';
const em = 'elemMas';
const cr = 'critRate_';
const cd = 'critDMG_';
const heal = 'heal_';
const pyro = 'pyro';
const hydro = 'hydro';
const electro = 'electro';
const dendro = 'dendro';
const anemo = 'anemo';
const geo = 'geo';
const cryo = 'cryo';
const phys = 'phys';

// builds for each character
const kqmBuilds = {
  Albedo: {
    'Off-Field DPS': {
      sets: ['GoldenTroupe'],
      mainstats: {
        sands: [def],
        goblet: [geo],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, def],
    },
  },
  Alhaitham: {
    'On-Field DPS': {
      sets: ['GildedDreams'],
      mainstats: {
        sands: [em],
        goblet: [dendro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, em, atk],
    },
  },
  Aloy: {},
  Amber: {},
  AratakiItto: {
    'On-Field DPS': {
      sets: ['HuskOfOpulentDreams'],
      mainstats: {
        sands: [def],
        goblet: [geo],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, def],
    },
  },
  Arlecchino: {
    'Mono Pyro': {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale'],
      mainstats: {
        sands: [atk],
        goblet: [pyro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk],
    },
    Vaporize: {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale'],
      mainstats: {
        sands: [atk, em],
        goblet: [pyro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk, em],
    },
  },
  Baizhu: {
    'Healing (without Fav)': {
      sets: ['DeepwoodMemories', 'OceanHuedClam'],
      mainstats: {
        sands: [er],
        goblet: [hp],
        circlet: [hp],
      },
      substats: [er, hp],
    },
  },
  Barbara: {
    'Healing (without Fav)': {
      sets: ['OceanHuedClam'],
      mainstats: {
        sands: [hp],
        goblet: [hp],
        circlet: [heal],
      },
      substats: [hp],
    },
  },
  Beidou: {
    'Off-Field DPS': {
      sets: ['EmblemOfSeveredFate', 'GladiatorsFinale', 'ThunderingFury', 'NoblesseOblige'],
      mainstats: {
        sands: [er],
        goblet: [electro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk],
    },
  },
  Bennett: {
    Healing: {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: [er],
        goblet: [hp],
        circlet: [hp, heal],
      },
      substats: [er, hp],
    },
    'Off-Field DPS': {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: [er, atk, em],
        goblet: [pyro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk, em],
    },
  },
  Candace: {
    'On-Field DPS': {
      sets: ['TenacityOfTheMillelith', 'GladiatorsFinale', 'EmblemOfSeveredFate', 'HeartOfDepth'],
      mainstats: {
        sands: [er],
        goblet: [hydro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk],
    },
    'Off-Field DPS': {
      sets: ['EmblemOfSeveredFate'],
      mainstats: {
        sands: [er],
        goblet: [hp, hydro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, hp],
    },
  },
  Charlotte: {
    'Healing (with Fav)': {
      sets: ['EmblemOfSeveredFate', 'GladiatorsFinale', 'MaidenBeloved'],
      mainstats: {
        sands: [er],
        goblet: [atk],
        circlet: [cr],
      },
      substats: [er, cr, atk],
    },
  },
  Chevreuse: {
    'Support (with Fav)': {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: [er],
        goblet: [hp],
        circlet: [hp, heal, cr],
      },
      substats: [er, hp, cr],
    },
  },
  Chiori: {
    'Off-Field DPS': {
      sets: ['GoldenTroupe'],
      mainstats: {
        sands: [def],
        goblet: [geo],
        circlet: [cr, cd],
      },
      substats: [cr, cd, def, atk],
    },
  },
  Chongyun: {
    'Quickswap Burst DPS': {
      sets: ['NoblessOblige'],
      mainstats: {
        sands: [atk, em, er],
        goblet: [cryo],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk, em],
    },
  },
  Clorinde: {
    'On-Field DPS': {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale', 'ThunderingFury'],
      mainstats: {
        sands: [em],
        goblet: [electro],
        circlet: [cr, cd],
      },
      substats: [cr, cd, atk, em],
    },
  },
  Collei: {
    'Crit Off-Field DPS': {
      sets: ['DeepwoodMemories', 'GildedDreams'],
      mainstats: {
        sands: [em, atk, er],
        goblet: [dendro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk, em],
    },
  },
  Cyno: {
    'On-Field DPS': {
      sets: ['ThunderingFury'],
      mainstats: {
        sands: [em],
        goblet: [electro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, em],
    },
  },
  Dehya: {
    'Hyperburgeon Support': {
      sets: ['Instructor'],
      mainstats: {
        sands: [em],
        goblet: [em],
        circlet: [em],
      },
      substats: [em, hp, er],
    },
    'On-Field DPS (C0)': {
      sets: ['EmblemOfSeveredFate'],
      mainstats: {
        sands: [er],
        goblet: [pyro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, atk],
    },
  },
  Diluc: {
    'On-Field Melt': {
      sets: ['CrimsonWitchOfFlames', 'GildedDreams'],
      mainstats: {
        sands: [em],
        goblet: [pyro],
        circlet: [cr, cd],
      },
      substats: [cr, cd, atk, em],
    },
  },
  Diona: {
    Support: {
      sets: ['EmbldOfSeveredFate', 'TenacityOfTheMillelith', 'MaidenBeloved'],
      mainstats: {
        sands: [hp],
        goblet: [hp],
        circlet: [hp, heal],
      },
      substats: [er, hp, cr],
    },
  },
  Dori: {
    'C6 Quickbloom': {
      sets: ['ThunderingFury'],
      mainstats: {
        sands: [er],
        goblet: [electro],
        circlet: [cr, cd],
      },
      substats: [er, cr, cd, em],
    },
  },
  Emilie: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Eula: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Faruzan: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Fischl: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Freminet: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Furina: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Gaming: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Ganyu: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Gorou: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  HuTao: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Jean: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  KaedeharaKazuha: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Kaeya: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  KamisatoAyaka: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  KamisatoAyato: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Kaveh: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Keqing: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Kirara: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Klee: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  KujouSara: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  KukiShinobu: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Layla: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Lisa: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Lynette: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Lyney: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Mika: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Mona: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Nahida: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Navia: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Neuvillette: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Nilou: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Ningguang: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Noelle: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Qiqi: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  RaidenShogun: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Razor: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Rosaria: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  SangonomiyaKokomi: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Sayu: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Sethos: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Shenhe: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  ShikanoinHeizou: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Sigewinne: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Sucrose: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Tartaglia: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Thoma: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Tighnari: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Traveler: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Venti: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Wanderer: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Wriothesley: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Xiangling: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Xianyun: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Xiao: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Xingqiu: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Xinyan: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  YaeMiko: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Yanfei: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Yaoyao: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Yelan: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Yoimiya: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  YunJin: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
  Zhongli: {
    // '': {
    //   sets: [''],
    //   mainstats: {
    //     sands: [''],
    //     goblet: [''],
    //     circlet: [''],
    //   },
    //   substats: [''],
    // },
  },
};
export default kqmBuilds;
