import navigatorService from './navigator';

describe('Navigator Service', () => {
  it('should check service workers availability', () => {
    expect(navigatorService.isServiceWorkersAvailable()).toEqual(!!navigator.serviceWorker);
  });

  it('should register a service worker', () => {
    const filename = '/some-sw.js';
    window.navigator.serviceWorker = { register: jest.fn() };
    navigatorService.registerServiceWorker(filename);
    expect(window.navigator.serviceWorker.register).toHaveBeenCalledWith(filename);
  });
});
