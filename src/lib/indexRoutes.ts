import type { Route } from '$types/index/route';

export const publicRoutes: Route[] = [
  {
    path: 'settings',
    LL: 'settings',
    isWorking: true
  },
  {
    path: 'chat',
    LL: 'chat',
    isWorking: true
  }
];

export const privateRoutes: Route[] = [
  {
    path: 'settings',
    LL: 'settings',
    isWorking: true
  },
  {
    path: 'chat',
    LL: 'chat',
    isWorking: true
  },
  {
    path: 'followalerts',
    LL: 'followAlerts',
    isWorking: true
  },
  {
    path: 'subscribealerts',
    LL: 'subscribeAlerts',
    isWorking: true
  },
  {
    path: 'prediction',
    LL: 'predictionWidget',
    isWorking: true
  },
  {
    path: 'donationalerts',
    LL: 'donationAlerts',
    isWorking: true
  },
  {
    path: 'wip',
    LL: 'bitsAlerts'
  },
  {
    path: 'wip',
    LL: 'raidAlerts'
  }
];
