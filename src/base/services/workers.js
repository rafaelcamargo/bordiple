import { registerServiceWorker } from '@src/base/services/service-worker';

export const init = () => {
  registerServiceWorker({ name: 'Main Service Worker', filename: '/main-sw.js' });
};

init();
