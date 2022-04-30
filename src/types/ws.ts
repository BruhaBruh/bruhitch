export type TwitchEventFollowData = {
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  followed_at: string;
};

export enum RequestMessageType {
  SubscribeFollow = 'subscribe/follow'
}

export type WSRequest<T> = {
  type: RequestMessageType;
  data?: T;
};

export enum BaseResponseMessageType {
  Error = 'error',
  Status = 'status'
}

export enum WSResponseMessageType {
  Subscribed = 'subscribed'
}

export enum CallbackResponseMessageType {
  SubscribeFollow = 'subscribe/follow'
}

export type ResponseMessageType =
  | BaseResponseMessageType
  | WSResponseMessageType
  | CallbackResponseMessageType;

export type WSResponse<T> = {
  type: ResponseMessageType;
  message?: string; // On Error and Status ResponseMessageTypes
  data?: T;
};
