import ENV from '@environment';
import Staly from '@compilorama/staly';
import { StalyMock, stalyInstanceMock } from '@src/base/mocks/staly';
import analyticsService from './analytics';

jest.mock('@compilorama/staly');
Staly.mockImplementation(StalyMock);

describe('Analytics Service', () => {
  beforeEach(() => {
    stalyInstanceMock.init = jest.fn();
    stalyInstanceMock.trackPageview = jest.fn();
  });

  it('should initialize glorious analytics', () => {
    analyticsService.init();
    expect(stalyInstanceMock.init).toHaveBeenCalledWith(
      ENV.ANALYTICS.PLAUSIBLE.DOMAIN, {
        trackLocalhost: false
      }
    );
  });

  it('should track page view', () => {
    analyticsService.init();
    analyticsService.trackPageView();
    expect(stalyInstanceMock.trackPageview).toHaveBeenCalledTimes(1);
  });
});
