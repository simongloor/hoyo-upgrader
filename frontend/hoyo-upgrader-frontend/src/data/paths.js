const paths = {
  DOCUMENTATION: 'documentation',
  EDIT_BUILDS: 'builds',
  IMPORT_ARTIFACTS: 'import',
  localStorage: {
    artifactsJson: 'artifactsJson',
    charactersJson: 'charactersJson',
    buildsJson: 'buildsJson',
  },
  piece: {
    flower: 'flower',
    plume: 'plume',
    sands: 'sands',
    goblet: 'goblet',
    circlet: 'circlet',
  },
  character: {
    Albedo: 'Albedo',
    Alhaitham: 'Alhaitham',
    Aloy: 'Aloy',
    Amber: 'Amber',
    AratakiItto: 'Itto',
    Arlecchino: 'Arlecchino',
    Baizhu: 'Baizhu',
    Barbara: 'Barbara',
    Beidou: 'Beidou',
    Bennett: 'Bennett',
    Candace: 'Candace',
    Charlotte: 'Charlotte',
    Chevreuse: 'Chevreuse',
    Chiori: 'Chiori',
    Chongyun: 'Chongyun',
    Clorinde: 'Clorinde',
    Collei: 'Collei',
    Cyno: 'Cyno',
    Dehya: 'Dehya',
    Diluc: 'Diluc',
    Diona: 'Diona',
    Dori: 'Dori',
    Eula: 'Eula',
    Faruzan: 'Faruzan',
    Fischl: 'Fischl',
    Freminet: 'Freminet',
    Furina: 'Furina',
    Gaming: 'Gaming',
    Ganyu: 'Ganyu',
    Gorou: 'Gorou',
    HuTao: 'Hu Tao',
    Jean: 'Jean',
    KaedeharaKazuha: 'Kazuha',
    Kaeya: 'Kaeya',
    KamisatoAyaka: 'Ayaka',
    KamisatoAyato: 'Ayato',
    Kaveh: 'Kaveh',
    Keqing: 'Keqing',
    Kirara: 'Kirara',
    Klee: 'Klee',
    KujouSara: 'Kujou Sara',
    KukiShinobu: 'Kuki Shinobu',
    Layla: 'Layla',
    Lisa: 'Lisa',
    Lynette: 'Lynette',
    Lyney: 'Lyney',
    Mika: 'Mika',
    Mona: 'Mona',
    Nahida: 'Nahida',
    Navia: 'Navia',
    Neuvillette: 'Neuvillette',
    Nilou: 'Nilou',
    Ningguang: 'Ningguang',
    Noelle: 'Noelle',
    Qiqi: 'Qiqi',
    RaidenShogun: 'Raiden Shogun',
    Razor: 'Razor',
    Rosaria: 'Rosaria',
    SangonomiyaKokomi: 'Kokomi',
    Sayu: 'Sayu',
    Sethos: 'Sethos',
    Shenhe: 'Shenhe',
    ShikanoinHeizou: 'Heizou',
    Sigewinne: 'Sigewinne',
    Sucrose: 'Sucrose',
    Tartaglia: 'Tartaglia',
    Thoma: 'Thoma',
    Tighnari: 'Tighnari',
    Traveler: 'Traveler',
    // DMC: 'Dendro Traveler',
    // GMC: 'Geo Traveler',
    // HMC: 'Hydro Traveler',
    // EMC: 'Electro Traveler',
    Venti: 'Venti',
    Wanderer: 'Wanderer',
    Wriothesley: 'Wriothesley',
    Xiangling: 'Xiangling',
    Xianyun: 'Xianyun',
    Xiao: 'Xiao',
    Xingqiu: 'Xingqiu',
    Xinyan: 'Xinyan',
    YaeMiko: 'Yae Miko',
    Yanfei: 'Yanfei',
    Yaoyao: 'Yaoyao',
    Yelan: 'Yelan',
    Yoimiya: 'Yoimiya',
    YunJin: 'Yun Jin',
    Zhongli: 'Zhongli',
  },
  set: {
    // Adventurer: 'Adventurer',
    ArchaicPetra: 'Archaic Petra',
    Berserker: 'Berserker',
    BlizzardStrayer: 'Blizzard Strayer',
    BloodstainedChivalry: 'Bloodstained Chivalry',
    // BraveHeart: 'Brave Heart',
    CrimsonWitchOfFlames: 'Crimson Witch of Flames',
    DeepwoodMemories: 'Deepwood Memories',
    // DefendersWill: 'Defender\'s Will',
    DesertPavilionChronicle: 'Desert Pavilion Chronicle',
    EchoesOfAnOffering: 'Echoes of an Offering',
    EmblemOfSeveredFate: 'Emblem of Severed Fate',
    FlowerOfParadiseLost: 'Flower of Paradise Lost',
    FragmentOfHarmonicWhimsy: 'Fragment of Harmonic Whimsy',
    // Gambler: 'Gambler',
    GildedDreams: 'Gilded Dreams',
    GladiatorsFinale: 'Gladiator\'s Finale',
    GoldenTroupe: 'Golden Troupe',
    HeartOfDepth: 'Heart of Depth',
    HuskOfOpulentDreams: 'Husk of Opulent Dreams',
    Instructor: 'Instructor',
    Lavawalker: 'Lavawalker',
    // LuckyDog: 'Lucky Dog',
    MaidenBeloved: 'Maiden Beloved',
    MarechausseeHunter: 'Marechaussee Hunter',
    // MartialArtist: 'Martial Artist',
    NighttimeWhispersInTheEchoingWoods: 'Nighttime Whispers in the Echoing Woods',
    NoblesseOblige: 'Noblesse Oblige',
    NymphsDream: 'Nymph\'s Dream',
    OceanHuedClam: 'Ocean-Hued Clam',
    PaleFlame: 'Pale Flame',
    // PrayersForDestiny: 'Prayers for Destiny',
    // PrayersForIllumination: 'Prayers for Illumination',
    // PrayersForWisdom: 'Prayers for Wisdom',
    // PrayersToSpringtime: 'Prayers to Springtime',
    // ResolutionOfSojourner: 'Resolution of Sojourner',
    RetracingBolide: 'Retracing Bolide',
    // Scholar: 'Scholar',
    ShimenawasReminiscence: 'Shimenawa\'s Reminiscence',
    SongOfDaysPast: 'Song of Days Past',
    TenacityOfTheMillelith: 'Tenacity of the Millelith',
    TheExile: 'The Exile',
    ThunderingFury: 'Thundering Fury',
    Thundersoother: 'Thundersoother',
    // TinyMiracle: 'Tiny Miracle',
    // TravelingDoctor: 'Traveling Doctor',
    UnfinishedReverie: 'Unfinished Reverie',
    VermillionHereafter: 'Vermillion Hereafter',
    ViridescentVenerer: 'Viridescent Venerer',
    VourukashasGlow: 'Vourukasha\'s Glow',
    WanderersTroupe: 'Wanderer\'s Troupe',
  },
  stats: {
    enerRech_: 'Energy Recharge%',
    critDMG_: 'CRIT DMG%',
    critRate_: 'CRIT Rate%',
    eleMas: 'Elemental Mastery',
    atk_: 'ATK%',
    def_: 'DEF%',
    hp_: 'HP%',
    heal_: 'Healing Bonus%',
    electro_dmg_: 'Electro DMG Bonus%',
    pyro_dmg_: 'Pyro DMG Bonus%',
    cryo_dmg_: 'Cryo DMG Bonus%',
    hydro_dmg_: 'Hydro DMG Bonus%',
    anemo_dmg_: 'Anemo DMG Bonus%',
    geo_dmg_: 'Geo DMG Bonus%',
    dendro_dmg_: 'Dendro DMG Bonus%',
    physical_dmg_: 'Physical DMG Bonus%',
    atk: 'ATK',
    def: 'DEF',
    hp: 'HP',
  },
  statsShort: {
    enerRech_: 'ER',
    critDMG_: 'CD',
    critRate_: 'CR',
    eleMas: 'EM',
    atk_: 'ATK',
    def_: 'DEF',
    hp_: 'HP',
    heal_: 'Heal',
    electro_dmg_: 'Elec',
    pyro_dmg_: 'Pyro',
    cryo_dmg_: 'Cryo',
    hydro_dmg_: 'Hydro',
    anemo_dmg_: 'Anemo',
    geo_dmg_: 'Geo',
    dendro_dmg_: 'Dendro',
    physical_dmg_: 'Phys',
    atk: 'ATK',
    def: 'DEF',
    hp: 'HP',
  },
};
export default paths;

const statValueParts = Object.keys(paths.stats).reduce((acc, stat) => {
  // does the stat end with a %?
  const isPercent = paths.stats[stat].endsWith('%');
  acc[stat] = {
    name: isPercent ? paths.stats[stat].slice(0, -1) : paths.stats[stat],
    unit: isPercent ? '%' : '',
  };
  return acc;
}, {});

export function getStatText({ key, value }) {
  const { name, unit } = statValueParts[key];
  return `${name}+${value}${unit}`;
}
