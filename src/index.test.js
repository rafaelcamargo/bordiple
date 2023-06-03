import ReactDOM from 'react-dom';
import { screen, pause } from '@src/base/services/testing';
import analyticsService from '@src/base/services/analytics';
import { mount } from '.';

describe('Index', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div data-app></div>';
    analyticsService.init = jest.fn();
    analyticsService.trackPageView = jest.fn();
  });

  afterEach(async () => {
    const container = document.querySelector('[data-app]');
    ReactDOM.unmountComponentAtNode(container);
    await new Promise(resolve => {
      setTimeout(() => {
        container.remove();
        resolve();
      });
    });
  });

  it('should render a homepage', async () => {
    mount();
    await pause();
    expect(screen.getByRole('heading', { name: 'Bordiple' })).toBeInTheDocument();
    expect(analyticsService.init).toHaveBeenCalledTimes(1);
    expect(analyticsService.trackPageView).toHaveBeenCalledTimes(1);
  });
});
