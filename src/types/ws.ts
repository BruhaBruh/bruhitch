export type TwitchEventFollowData = {
  user_id: string;
  user_login: string;
  user_name: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  followed_at: string;
};

export type Predictor = {
  user_id: string;
  user_login: string;
  user_name: string;
  channel_points_won: number | null;
  channel_points_used: number;
};

export type PredictionOutcome = {
  id: string;
  title: string;
  color: 'blue' | 'pink';
  users?: number;
  channel_points?: number;
  top_predictors?: Predictor[];
};

export type TwitchEventPredictionData = {
  id: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  title: string;
  outcomes: PredictionOutcome[];
  started_at: string;
  locks_at: string;
};

export type TwitchEventPredictionEndData = {
  id: string;
  broadcaster_user_id: string;
  broadcaster_user_login: string;
  broadcaster_user_name: string;
  title: string;
  winning_outcome_id: string;
  outcomes: PredictionOutcome[];
  status: 'resolved' | 'canceled';
  started_at: string;
  ended_at: string;
};

export enum RequestMessageType {
  SubscribeFollow = 'subscribe/follow',
  SubscribePrediction = 'subscribe/prediction',
  Ping = 'PING'
}

export type WSRequest<T> = {
  type: RequestMessageType;
  data?: T;
};

export enum BaseResponseMessageType {
  Error = 'error',
  Reconnect = 'reconnect'
}

export enum WSResponseMessageType {
  Subscribed = 'subscribed',
  Pong = 'PONG'
}

export enum CallbackResponseMessageType {
  SubscribeFollow = 'subscribe/follow',
  SubscribePredictionBegin = 'subscribe/prediction/begin',
  SubscribePredictionProgress = 'subscribe/prediction/progress',
  SubscribePredictionEnd = 'subscribe/prediction/end'
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
