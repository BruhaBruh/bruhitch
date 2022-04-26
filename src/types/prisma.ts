/**
 * Model User
 *
 */
export type User = {
  id: string;
  username: string;
  avatar: string;
  createdAt: Date;
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
