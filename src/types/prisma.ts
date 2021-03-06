/**
 * Model User
 *
 */
export type User = {
  id: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Model RefreshToken
 *
 */
export type RefreshToken = {
  id: string;
  userId: string;
};

/**
 * Model Twitch
 *
 */
export type Twitch = {
  id: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
};

/**
 * Model TwitchToken
 *
 */
export type TwitchToken = {
  id: string;
  userId: string;
};

/**
 * Model DonationAlerts
 *
 */
export type DonationAlerts = {
  id: string;
  refreshToken: string;
  userId: string;
};

/**
 * Model ChatSettings
 *
 */
export type ChatSettings = {
  id: string;
  link: string;
  userId: string;
};

/**
 * Model FollowSettings
 *
 */
export type FollowSettings = {
  id: string;
  pattern: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  backgroundImage: string;
  colorNickname: string;
  isGradientNickname: boolean;
  animation: string;
  animationEasing: string;
  animationParams: string;
  vertical: string;
  horizontal: string;
  userId: string;
};

/**
 * Model SubscribeSettings
 *
 */
export type SubscribeSettings = {
  id: string;
  subPattern: string;
  giftPattern: string;
  giftMultiMonthPattern: string;
  anonymous: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  image: string;
  usernameColor: string;
  isGradientUsername: boolean;
  recipientColor: string;
  isGradientRecipient: boolean;
  animation: string;
  animationEasing: string;
  animationParams: string;
  vertical: string;
  userId: string;
};

/**
 * Model PredictionSettings
 *
 */
export type PredictionSettings = {
  id: string;
  textColor: string;
  blueColor: string;
  pinkColor: string;
  channelPointImage: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  hideDelay: number;
  animation: string;
  animationEasing: string;
  animationParams: string;
  vertical: string;
  userId: string;
};

/**
 * Model DonateSettings
 *
 */
export type DonateSettings = {
  id: string;
  usernameColor: string;
  isGradientUsername: boolean;
  currencyColor: string;
  isGradientCurrency: boolean;
  soundColor: string;
  textColor: string;
  anonymous: string;
  image: string;
  hideDelay: number;
  volume: number;
  font: string;
  fontSize: number;
  disablePadding: boolean;
  animation: string;
  animationEasing: string;
  animationParams: string;
  vertical: string;
  userId: string;
};
