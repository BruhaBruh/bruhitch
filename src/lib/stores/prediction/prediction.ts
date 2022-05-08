import type { EventSubPredictionData, EventSubPredictionEndData } from '$types/eventsub';
import { writable } from 'svelte/store';

export type PredictionStatus = 'begin' | 'progress' | 'end';

export type PredictionData = EventSubPredictionData | EventSubPredictionEndData;

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

const createEndedPredictions = (initialState: { id: string; date: number }[]) => {
  const { set, subscribe, update } = writable(initialState);

  return {
    subscribe,
    add: (id: string) =>
      update((v) => {
        let newArr = [...v, { id, date: new Date().getTime() }].sort((a, b) => b.date - a.date);
        if (newArr.length > 50) {
          newArr = newArr.slice(-5);
        }
        return newArr;
      }),
    reset: () => set(initialState)
  };
};

export const endedPredictions = createEndedPredictions([]);

export const showPrediction = writable(false);
