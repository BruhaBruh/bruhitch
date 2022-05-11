export enum Animation {
  Fade = 'fade',
  Slide = 'slide',
  Scale = 'scale',
  Nothing = 'nothing'
}

export enum AnimationEasing {
  Linear = 'linear',
  BackInOut = 'backInOut',
  BackIn = 'backIn',
  BackOut = 'backOut',
  BounceInOut = 'bounceInOut',
  BounceIn = 'bounceIn',
  BounceOut = 'bounceOut',
  CircInOut = 'circInOut',
  CircIn = 'circIn',
  CircOut = 'circOut',
  CubicInOut = 'cubicInOut',
  CubicIn = 'cubicIn',
  CubicOut = 'cubicOut',
  ElasticInOut = 'elasticInOut',
  ElasticIn = 'elasticIn',
  ElasticOut = 'elasticOut',
  ExpoInOut = 'expoInOut',
  ExpoIn = 'expoIn',
  ExpoOut = 'expoOut',
  QuadInOut = 'quadInOut',
  QuadIn = 'quadIn',
  QuadOut = 'quadOut',
  QuartInOut = 'quartInOut',
  QuartIn = 'quartIn',
  QuartOut = 'quartOut',
  QuintInOut = 'quintInOut',
  QuintIn = 'quintIn',
  QuintOut = 'quintOut',
  SineInOut = 'sineInOut',
  SineIn = 'sineIn',
  SineOut = 'sineOut'
}

export type AnimationParams = {
  duration?: number;
  start?: number;
  opacity?: number;
};

export type ShowAnimationParams = { [K in keyof AnimationParams]: boolean };
