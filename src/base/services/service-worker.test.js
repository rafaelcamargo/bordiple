import ENV_DEV from '@src/../environments/development';
import ENV_PROD from '@src/../environments/production';
import { pause } from '@src/base/services/testing';
import envService from '@src/base/services/env';
import navigatorService from '@src/base/services/navigator';
import { registerServiceWorker } from './service-worker';

describe('Service Worker Service', () => {
  function simulateServiceWorkerUnavailability(){
    navigatorService.isServiceWorkersAvailable = jest.fn(() => false);
  }

  function simulateServiceWorkerAvailability(){
    navigatorService.isServiceWorkersAvailable = jest.fn(() => true);
  }

  beforeEach(() => {
    console.log = jest.fn();
    envService.get = jest.fn(() => ENV_PROD);
    navigatorService.registerServiceWorker = jest.fn(() => Promise.resolve({}));
    simulateServiceWorkerAvailability();
  });

  it('should not register a service worker if navigator has no support for service workers', async () => {
    simulateServiceWorkerUnavailability();
    registerServiceWorker({ filename: '/sw.js' });
    await pause();
    expect(navigatorService.registerServiceWorker).not.toHaveBeenCalled();
  });

  it('should not register a service worker if environment is other than production', async () => {
    envService.get = jest.fn(() => ENV_DEV);
    registerServiceWorker({ filename: '/sw.js' });
    await pause();
    expect(navigatorService.registerServiceWorker).not.toHaveBeenCalled();
  });

  it('should not register a service worker if filename has not been given', async () => {
    registerServiceWorker();
    await pause();
    expect(navigatorService.registerServiceWorker).not.toHaveBeenCalled();
  });

  it('should register a service worker if navigator supports service workers', async () => {
    registerServiceWorker({ filename: '/sw.js' });
    await pause();
    expect(navigatorService.registerServiceWorker).toHaveBeenCalledWith('/sw.js');
    expect(console.log).toHaveBeenCalledWith('Service Worker registered successfully');
  });

  it('should log a custom message if service worker name has been given', async () => {
    registerServiceWorker({ name: 'My Pretty SW', filename: '/sw.js' });
    await pause();
    expect(navigatorService.registerServiceWorker).toHaveBeenCalledWith('/sw.js');
    expect(console.log).toHaveBeenCalledWith('My Pretty SW registered successfully');
  });

  it('should log an error if main service work registration fails', async () => {
    console.error = jest.fn();
    navigatorService.registerServiceWorker = jest.fn(() => Promise.reject());
    registerServiceWorker({ name: 'Buggy Service Worker', filename: '/sw.js' });
    await pause();
    expect(console.error).toHaveBeenCalledWith('Buggy Service Worker registration failed');
  });
});
