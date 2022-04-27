export type TwitchEventFollowData = {
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  followed_at: string;
};

export enum MessageType {
  SubscribeFollow = 'subscribe/follow'
}

export enum MessageResponseType {
  SubscribeFollow = 'channel.follow'
}

export type SubscribeFollowRequest = {
  type: MessageType.SubscribeFollow;
};
export type SubscribeFollowResponse = {
  type: MessageResponseType;
  data: TwitchEventFollowData;
};

export type MessageRequest = SubscribeFollowRequest;
export type MessageResponse = { message: MessageType } | SubscribeFollowResponse;
