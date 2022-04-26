import type { BaseTranslation } from 'typesafe-i18n';

const en: BaseTranslation = {
  pageNames: {
    index: 'Bruhitch',
    settings: 'Bruhitch › Settings',
    chat: 'Bruhitch › Chat'
  },
  continueWithTwitch: 'Continue with Twitch',
  settings: {
    name: 'Settings',
    theme: 'Theme',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    language: 'Language',
    deleteAccount: 'Delete account',
    deleteAccountDescription: 'This action cannot be undone, are you sure?',
    accountDeleted: 'Account deleted',
    accountNotDeleted: 'Account not deleted'
  },
  chat: {
    name: 'Chat',
    title: 'Chat widget link generator',
    incorrectUrl: 'Incorrect url',
    preview: 'Chat preview',
    nickname: 'Nickname',
    channel: 'Channel',
    chatType: 'Chat type',
    default: 'Default',
    block: 'Block',
    alternativeBlock: 'Alternative block',
    hideRewards: 'Hide rewards',
    hideRewardsDescription: 'Hide claim channel points rewards in chat',
    hiddenNicknames: 'Hidden nicknames',
    defaultColor: 'Default color',
    gradientOnlyToCustomNicknames: 'Gradient only to custom nicknames',
    customColorNicknames: 'Custom color nicknames',
    isGradient: 'Is gradient?',
    font: 'Font',
    fontSize: 'Font size',
    disablePadding: 'Disable padding',
    animation: 'Animation',
    animationParams: {
      name: 'Animation parameters',
      duration: 'duration in ms',
      startScale: 'start scale',
      opacity: 'opacity'
    },
    chatLink: 'Chat widget link',
    loadConfigFromLink: 'Load config from link'
  },
  donationAlerts: {
    name: 'Donation alerts'
  },
  followAlerts: {
    name: 'Follow alerts'
  },
  subscribeAlerts: {
    name: 'Subscribe alerts'
  },
  raidAlerts: {
    name: 'Raid alerts'
  },
  bitsAlerts: {
    name: 'Bits alerts'
  },
  copy: 'Copy',
  copied: 'Copied',
  load: 'Load',
  loaded: 'Loaded',
  add: 'Add',
  remove: 'Remove',
  delete: 'Delete',
  cancel: 'Cancel',
  wip: 'Work In Progress'
};

export default en;
