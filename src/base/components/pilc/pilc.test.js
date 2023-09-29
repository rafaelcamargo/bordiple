import { renderWebComponent, teardownWebComponent, shadowDOM, pause } from '@src/base/services/testing';
import '@src/base/components/pilc/pilc';

describe('Pilc', () => {
  async function mount({ text, style = '' }){
    return await renderWebComponent(
      `<b-pilc data-text="${text}" data-style="${style}" />`
    );
  }

  afterEach(() => {
    teardownWebComponent();
  });

  it('should copy text to clipboard', async () => {
    const text = 'some text';
    await mount({ text });
    const button = getButton();
    button.click();
    await pause();
    expect(button.textContent).toEqual('Copied!');
    await pause(1500);
    expect(button.textContent).toEqual('Copy');
    const copiedText = await window.navigator.clipboard.readText();
    expect(copiedText).toEqual(text);
  });

  it('should optionally set style', async () => {
    const style = 'color: red;';
    await mount({ style });
    expect(getButton()).toHaveAttribute('style', style);
  });

  function getButton(){
    return shadowDOM.screen.getByShadowRole('button', { name: 'Copy' });
  }
});
