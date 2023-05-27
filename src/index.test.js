import ReactDOM from 'react-dom';
import { screen } from '@src/base/services/testing';
import { mount } from '.';

describe('Index', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div data-app></div>';
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

  it('should render a homepage', () => {
    mount();
    expect(screen.getByRole('heading', { name: 'Bordiple' })).toBeInTheDocument();
  });
});
