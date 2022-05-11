import type { BaseTranslation } from 'typesafe-i18n';

const en: BaseTranslation = {
  pageNames: {
    index: 'Bruhitch',
    another: 'Bruhitch › {0}'
  },
  authorization: 'Authorization is required',
  continueWithTwitch: 'Continue with Twitch',
  logout: 'Logout',
  dontShowLinkAnyone: 'Dont show link anyone',
  preview: 'Preview widget link',
  actionCanNotBeUndone: 'This action cannot be undone, are you sure?',
  controls: {
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
    alignment: {
      vertical: 'Vertical alignment',
      horizontal: 'Horizontal alignment',
      top: 'Top',
      bottom: 'Bottom',
      center: 'Center',
      right: 'Right',
      left: 'Left'
    }
  },
  index: {
    aboutProject: 'About project',
    idea: {
      title: 'Idea',
      description: 'I wanted to create my own widgets in the same style and with flexible settings'
    },
    structure: {
      title: 'Project structure',
      client: 'Client',
      server: 'Server'
    },
    links: {
      title: 'Links',
      clientGitHub: 'Client GitHub',
      serverGitHub: 'Server GitHub',
      creatorsTelegram: "Creator's telegram",
      creatorsTwitch: "Creator's twitch",
      creatorsDonationAlerts: "Creator's DonationAlerts"
    }
  },
  settings: {
    name: 'Settings',
    darkTheme: 'Dark theme',
    language: 'Language',
    deleteAccount: 'Delete account',
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
      chatLink: 'Chat widget link',
      loadConfigFromLink: 'Load config from link'
    }
  },
  donationAlerts: {
    name: 'Donations',
    title: 'Donation alert settings',
    controls: {
      usernameColor: 'Username color',
      isGradientUsername: 'Is gradient on username?',
      currencyColor: 'Currency symbol color',
      isGradientCurrency: 'Is gradient on currency symbol?',
      soundColor: 'Sound icon color',
      textColor: 'Text color',
      anonymous: 'Anonymous',
      image: 'Image',
      hideDelay: 'Delay before remove',
      hideDelayDescription: 'The sound alert will be removed, but the sound will remain on',
      volume: 'Volume of sound',
      widgetLink: 'Donate alert widget link'
    }
  },
  followAlerts: {
    name: 'Follows',
    title: 'Follow alert settings',
    controls: {
      pattern: 'Pattern',
      patternDescription: '$username$ - show username. ![text](link) - image',
      textColor: 'Text color',
      backgroundColor: 'Background color',
      backgroundImage: 'Background image',
      backgroundImageDescription: 'Link to image',
      colorNickname: 'Nickname color',
      isGradientNickname: 'Is gradient nickname?',
      widgetLink: 'Follow alert widget link'
    }
  },
  subscribeAlerts: {
    name: 'Subscribes',
    title: 'Subscribe alert settings',
    controls: {
      subPattern: 'Subscribe/Resubscribe pattern',
      subPatternDescription: '$username$ - new sub. ![](link) - image',
      giftPattern: 'Gift pattern',
      giftPatternDescription: '$username$ - who gift sub. $recipient$ - new sub. ![](link) - image',
      giftMultiMonthPattern: 'Gift with multiple months',
      giftMultiMonthPatternDescription:
        '$username$ - who gift sub. $recipient$ - new sub. $duration$ - months. ![](link) - image',
      anonymous: 'Anonymous',
      anonymousDescription: 'This replaces $username$ when anonymous gifts a subscription',
      image: 'Image',
      usernameColor: 'Username color',
      recipientColor: 'Recipient color',
      isGradientUsername: 'Is gradient username?',
      isGradientRecipient: 'Is gradient recipient?',
      widgetLink: 'Subscribe alert widget link'
    }
  },
  predictionWidget: {
    name: 'Predications',
    title: 'Predication widget settings',
    controls: {
      textColor: 'Text color',
      blueColor: 'Blue color',
      pinkColor: 'Pink color',
      channelPointImage: 'Channel points image',
      hideDelay: 'Hide delay',
      widgetLink: 'Predication widget link'
    }
  },
  raidAlerts: {
    name: 'Raid alerts'
  },
  bitsAlerts: {
    name: 'Bits alerts'
  },
  copy: 'Copy',
  copied: 'Copied',
  refresh: 'Refresh',
  load: 'Load',
  loaded: 'Loaded',
  add: 'Add',
  save: 'Save',
  saved: 'Saved',
  remove: 'Remove',
  delete: 'Delete',
  cancel: 'Cancel',
  close: 'Close',
  wip: 'Work In Progress',
  errorOccurred: 'An error has occurred'
};

export default en;
