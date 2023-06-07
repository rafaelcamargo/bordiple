import { renderWebComponent, teardownWebComponent, shadowDOM } from '@src/base/services/testing';
import '@src/base/components/spoonarm/spoonarm';

describe('Spoonarm', () => {
  async function mount({ repo }){
    return await renderWebComponent(`<b-spoonarm repo="${repo}" />`);
  }

  afterEach(() => {
    teardownWebComponent();
  });

  it('should build a link to the given github repository', async () => {
    await mount({ repo: 'rafaelcamargo/bordiple' });
    const link = await shadowDOM.screen.getByShadowRole('link', { name: 'Star it on Github' });
    expect(link).toHaveAttribute('href', 'https://github.com/rafaelcamargo/bordiple/stargazers');
  });
});
