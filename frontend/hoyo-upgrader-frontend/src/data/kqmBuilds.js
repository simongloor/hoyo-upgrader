const kqmBuilds = {
  Albedo: {
    'Off-Field DPS': {
      sets: ['GoldenTroupe'],
      mainstats: {
        sands: ['def_'],
        goblet: ['geo_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'def_'],
    },
  },
  Alhaitham: {
    'On-Field DPS': {
      sets: ['GildedDreams'],
      mainstats: {
        sands: ['eleMas'],
        goblet: ['dendro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'eleMas', 'atk_'],
    },
  },
  Aloy: {},
  Amber: {},
  AratakiItto: {
    'On-Field DPS': {
      sets: ['HuskOfOpulentDreams'],
      mainstats: {
        sands: ['def_'],
        goblet: ['geo_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'def_'],
    },
  },
  Arlecchino: {
    'Mono Pyro': {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale'],
      mainstats: {
        sands: ['atk_'],
        goblet: ['pyro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_'],
    },
    Vaporize: {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale'],
      mainstats: {
        sands: ['atk_', 'eleMas'],
        goblet: ['pyro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Baizhu: {
    'Healing (without Fav)': {
      sets: ['DeepwoodMemories', 'OceanHuedClam'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['hp_'],
        circlet: ['hp_'],
      },
      substats: ['enerRech_', 'hp_'],
    },
  },
  Barbara: {
    'Healing (without Fav)': {
      sets: ['OceanHuedClam'],
      mainstats: {
        sands: ['hp_'],
        goblet: ['hp_'],
        circlet: ['heal_'],
      },
      substats: ['hp_'],
    },
  },
  Beidou: {
    'Off-Field DPS': {
      sets: ['EmblemOfSeveredFate', 'GladiatorsFinale', 'ThunderingFury', 'NoblesseOblige'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['electro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_'],
    },
  },
  Bennett: {
    Healing: {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['hp_'],
        circlet: ['hp_', 'heal_'],
      },
      substats: ['enerRech_', 'hp_'],
    },
    'Off-Field DPS': {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: ['enerRech_', 'atk_', 'eleMas'],
        goblet: ['pyro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Candace: {
    'On-Field DPS': {
      sets: ['TenacityOfTheMillelith', 'GladiatorsFinale', 'EmblemOfSeveredFate', 'HeartOfDepth'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['hydro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_'],
    },
    'Off-Field DPS': {
      sets: ['EmblemOfSeveredFate'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['hp_', 'hydro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'hp_'],
    },
  },
  Charlotte: {
    'Healing (with Fav)': {
      sets: ['EmblemOfSeveredFate', 'GladiatorsFinale', 'MaidenBeloved'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['atk_'],
        circlet: ['critRate_'],
      },
      substats: ['enerRech_', 'critRate_', 'atk_'],
    },
  },
  Chevreuse: {
    'Support (with Fav)': {
      sets: ['NoblesseOblige'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['hp_'],
        circlet: ['hp_', 'heal_', 'critRate_'],
      },
      substats: ['enerRech_', 'hp_', 'critRate_'],
    },
  },
  Chiori: {
    'Off-Field DPS': {
      sets: ['GoldenTroupe'],
      mainstats: {
        sands: ['def_'],
        goblet: ['geo_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['critRate_', 'critDMG_', 'def_', 'atk_'],
    },
  },
  Chongyun: {
    'Quickswap Burst DPS': {
      sets: ['NoblessOblige'],
      mainstats: {
        sands: ['atk_', 'eleMas', 'enerRech_'],
        goblet: ['cryo_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Clorinde: {
    'On-Field DPS': {
      sets: ['FragmentOfHarmonicWhimsy', 'GladiatorsFinale', 'ThunderingFury'],
      mainstats: {
        sands: ['eleMas'],
        goblet: ['electro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Collei: {
    'Crit Off-Field DPS': {
      sets: ['DeepwoodMemories', 'GildedDreams'],
      mainstats: {
        sands: ['eleMas', 'atk_', 'enerRech_'],
        goblet: ['dendro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Cyno: {
    'On-Field DPS': {
      sets: ['ThunderingFury'],
      mainstats: {
        sands: ['eleMas'],
        goblet: ['electro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'eleMas'],
    },
  },
  Dehya: {
    'Hyperburgeon Support': {
      sets: ['Instructor'],
      mainstats: {
        sands: ['eleMas'],
        goblet: ['eleMas'],
        circlet: ['eleMas'],
      },
      substats: ['eleMas', 'hp_', 'enerRech_'],
    },
    'On-Field DPS (C0)': {
      sets: ['EmblemOfSeveredFate'],
      mainstats: {
        sands: ['enerRech_'],
        goblet: ['pyro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['enerRech_', 'critRate_', 'critDMG_', 'atk_'],
    },
  },
  Diluc: {
    'On-Field Melt': {
      sets: ['CrimsonWitchOfFlames', 'GildedDreams'],
      mainstats: {
        sands: ['eleMas'],
        goblet: ['pyro_dmg_'],
        circlet: ['critRate_', 'critDMG_'],
      },
      substats: ['critRate_', 'critDMG_', 'atk_', 'eleMas'],
    },
  },
  Diona: {
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
  Dori: {
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
