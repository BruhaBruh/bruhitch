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
  SubscribePredictionEnd = 'subscribe/prediction/end',
  VerificationFollow = 'verification/follow',
  VerificationPredictionBegin = 'verification/prediction/begin',
  VerificationPredictionProgress = 'verification/prediction/progress',
  VerificationPredictionEnd = 'verification/prediction/end'
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

export enum WsStatusCodes {
  NormalClose = 1000,
  GoingAway = 1001,
  ProtocolError = 1002,
  UnsupportedData = 1003,
  Reserved = 1004,
  NoStatusReceived = 1005,
  AbnormalClosure = 1006,
  InvalidFramePayloadData = 1007,
  PolicyViolation = 1008,
  MessageTooBig = 1009,
  MandatoryExt = 1010,
  InternalError = 1011,
  ServiceRestart = 1012,
  TryAgainLater = 1013,
  BadGateway = 1014,
  TLSHandshake = 1015,
  Forbidden = 3000,
  IncorrectType = 3002
}
