import ENV_PROD from '@src/../environments/production';
import { pause } from '@src/base/services/testing';
import envService from '@src/base/services/env';
import navigatorService from '@src/base/services/navigator';
import { init } from './workers';

describe('Workers Service', () => {
  beforeEach(() => {
    console.log = jest.fn();
    navigatorService.isServiceWorkersAvailable = jest.fn(() => true);
    navigatorService.registerServiceWorker = jest.fn(() => Promise.resolve({}));
    envService.get = jest.fn(() => ENV_PROD);
  });

  it('should register workers', async () => {
    init();
    await pause();
    expect(navigatorService.registerServiceWorker).toHaveBeenCalledWith('/main-sw.js');
    expect(console.log).toHaveBeenCalledWith('Main Service Worker registered successfully');
  });
});
