interface HomepageConfig {
  mode: 'random' | 'custom';
  generatorOptionsCollapsed: boolean;
  availableCombosCollapsed: boolean;
  bpm: string;
  rhythmUsed: { [key: number]: boolean };
  barCountMin: number;
  barCountMax: number;
  custom: string;
  rhythmSelected: number;
  version?: string;
}

const defaultHomepageConfig: HomepageConfig = {
  mode: 'random',
  generatorOptionsCollapsed: true,
  availableCombosCollapsed: true,
  bpm: '60',
  rhythmUsed: {
    1: true,
    2: true,
    3: true,
    4: false,
    5: false
  },
  barCountMin: 4,
  barCountMax: 6,
  custom: '',
  rhythmSelected: 1
}

const LS_HOMEPAGE_CONFIG = 'homepageConfig'

export { HomepageConfig, defaultHomepageConfig, LS_HOMEPAGE_CONFIG }
