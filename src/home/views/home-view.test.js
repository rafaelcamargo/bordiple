import { asyncMount, userEvent, fireEvent, RouterMock } from '@src/base/services/testing';
import { HomeView } from './home-view';

describe('Home View', () => {
  async function mount(){
    const user = userEvent.setup();
    const result = await asyncMount(
      <RouterMock>
        <HomeView />
      </RouterMock>
    );
    return { user, ...result };
  }

  it('should contain heading', async () => {
    const { getByRole } = await mount();
    expect(getByRole('heading', { name: 'Bordiple' })).toBeInTheDocument();
  });

  it('should initialize with a form pre-filled with three borders', async () => {
    const { getByLabelText } = await mount();
    expect(getByLabelText('border #1 width').value).toEqual('10');
    expect(getByLabelText('border #1 color').value).toEqual('#dc424e');
    expect(getByLabelText('border #2 width').value).toEqual('10');
    expect(getByLabelText('border #2 color').value).toEqual('#f48554');
    expect(getByLabelText('border #3 width').value).toEqual('10');
    expect(getByLabelText('border #3 color').value).toEqual('#fdbf59');
  });

  it('should render a preview element containing the borders set in the form', async () => {
    const { getByTitle } = await mount();
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 10px #DC424E',
      '0 0 0 20px #F48554',
      '0 0 0 30px #FDBF59'
    ].join(', '));
  });

  it('should show the css code related to the generated preview', async () => {
    const { container } = await mount();
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent(
      'margin: 30px; box-shadow: 0 0 0 10px #DC424E, 0 0 0 20px #F48554, 0 0 0 30px #FDBF59;'
    );
  });

  it('should optionally remove a border', async () => {
    const { user, container, getByLabelText, getByTitle } = await mount();
    await user.click(getByLabelText('delete border #1'));
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 10px #F48554',
      '0 0 0 20px #FDBF59'
    ].join(', '));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent(
      'margin: 20px; box-shadow: 0 0 0 10px #F48554, 0 0 0 20px #FDBF59;'
    );
  });

  it('should optionally add a border', async () => {
    const { user, container, getByRole, getByLabelText, getByTitle } = await mount();
    await user.click(getByRole('button', { name: 'Add Border' }));
    expect(getByLabelText('border #4 width').value).toEqual('10');
    expect(getByLabelText('border #4 color').value).toEqual('#4affff');
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 10px #DC424E',
      '0 0 0 20px #F48554',
      '0 0 0 30px #FDBF59',
      '0 0 0 40px #4AFFFF'
    ].join(', '));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent([
      'margin: 40px;',
      'box-shadow: 0 0 0 10px #DC424E, 0 0 0 20px #F48554, 0 0 0 30px #FDBF59, 0 0 0 40px #4AFFFF;'
    ].join(' '));
  });

  it('should optionally edit a border', async () => {
    const { user, container, getByLabelText, getByTitle } = await mount();
    const borderWidthInput = getByLabelText('border #3 width');
    const borderColorInput = getByLabelText('border #3 color');
    await user.clear(borderWidthInput);
    await user.type(borderWidthInput, '5');
    // Used fireEvent below because userEvent doesn’t
    // support interactions with color inputs:
    // https://github.com/testing-library/user-event/issues/423
    fireEvent.input(borderColorInput, { target: { name: 'color', value: '#333333' }});
    expect(getByLabelText('border #3 width').value).toEqual('5');
    expect(getByLabelText('border #3 color').value).toEqual('#333333');
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 10px #DC424E',
      '0 0 0 20px #F48554',
      '0 0 0 25px #333333'
    ].join(', '));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent([
      'margin: 25px;',
      'box-shadow: 0 0 0 10px #DC424E, 0 0 0 20px #F48554, 0 0 0 25px #333333;'
    ].join(' '));
  });
});
