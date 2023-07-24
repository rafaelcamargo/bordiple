import envService from '@src/base/services/env';
import navigatorService from '@src/base/services/navigator';

export const registerServiceWorker = ({ name = 'Service Worker', filename } = {}) => {
  if(shouldRegisterServiceWork(filename)) {
    navigatorService.registerServiceWorker(filename).then(() => {
      console.log(`${name} registered successfully`);
    }).catch(() => {
      console.error(`${name} registration failed`);
    });
  }
};

function shouldRegisterServiceWork(filename){
  const { SERVICE_WORKERS_ENABLED } = envService.get();
  return SERVICE_WORKERS_ENABLED && filename && navigatorService.isServiceWorkersAvailable();
}
