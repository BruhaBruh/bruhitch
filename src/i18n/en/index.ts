import type { BaseTranslation } from 'typesafe-i18n';

const en: BaseTranslation = {
  pageNames: {
    index: 'Bruhitch',
    another: 'Bruhitch › {0}'
  },
  authorization: 'Authorization is required',
  continueWithTwitch: 'Continue with Twitch',
  dontShowLinkAnyone: 'Dont show link anyone',
  settings: {
    name: 'Settings',
    theme: 'Theme',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    language: 'Language',
    deleteAccount: 'Delete account',
    deleteAccountDescription: 'This action cannot be undone, are you sure?',
    accountDeleted: 'Account deleted',
    accountNotDeleted: 'Account not deleted',
    refreshToken: 'Refresh token',
    refreshTokenDescription: 'After this update your widget links. Just copy',
    refreshError: 'Error on refresh token',
    refreshSuccess: 'Token is Refreshed',
    refreshSuccessDescription: 'Update your widget links'
  },
  chat: {
    name: 'Chat',
    title: 'Chat widget link generator',
    incorrectUrl: 'Incorrect url',
    preview: 'Chat preview',
    controls: {
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
    }
  },
  donationAlerts: {
    name: 'Donation alerts'
  },
  followAlerts: {
    name: 'Follow alerts',
    title: 'Follow alert settings',
    preview: 'Follow alert preview',
    controls: {
      font: 'Font',
      fontSize: 'Font size',
      disablePadding: 'Disable padding',
      animation: 'Animation',
      animationParams: {
        name: 'Animation parameters',
        startScale: 'start scale',
        opacity: 'opacity'
      },
      pattern: 'Pattern',
      patternDescription: '$username$ - show username. ![text](link) - image',
      textColor: 'Text color',
      backgroundColor: 'Background color',
      backgroundImage: 'Background image',
      backgroundImageDescription: 'Link to image',
      colorNickname: 'Nickname color',
      isGradientNickname: 'Is gradient nickname?',
      verticalAlign: 'Vertical align',
      horizontalAlign: 'Horizontal align',
      top: 'Top',
      bottom: 'Bottom',
      center: 'Center',
      right: 'Right',
      left: 'Left',
      widgetLink: 'Follow alert widget link'
    }
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
  save: 'Save',
  saved: 'Saved',
  remove: 'Remove',
  delete: 'Delete',
  cancel: 'Cancel',
  wip: 'Work In Progress',
  errorOccurred: 'An error has occurred'
};

export default en;
