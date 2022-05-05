import type { TwitchEventPredictionData, TwitchEventPredictionEndData } from '$types/ws';
import { writable } from 'svelte/store';

export type PredictionStatus = 'begin' | 'progress' | 'end';

export type PredictionData = TwitchEventPredictionData | TwitchEventPredictionEndData;

export type Prediction = {
  status: PredictionStatus;
  data: PredictionData;
} | null;

const createPrediction = (initialState: Prediction) => {
  const { set, subscribe } = writable(initialState);

  return {
    subscribe,
    setPrediction: (status: PredictionStatus, data: PredictionData) => set({ status, data }),
    reset: () => set(initialState)
  };
};

const prediction = createPrediction(null);

export default prediction;
