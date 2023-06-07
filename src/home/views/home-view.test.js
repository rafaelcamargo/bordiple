import { asyncMount, fireEvent, within } from '@src/base/services/testing';
import { HomeView } from './home-view';

describe('Home View', () => {
  async function mount(){
    return await asyncMount(<HomeView />);
  }

  it('should contain heading', async () => {
    const { getByRole } = await mount();
    expect(getByRole('heading', { name: 'Bordiple' })).toBeInTheDocument();
  });

  it('should initialize with a form pre-filled with three borders', async () => {
    const { getByLabelText } = await mount();
    expect(getByLabelText('border #1 width').value).toEqual('5');
    expect(getByLabelText('border #1 color').value).toEqual('#dc424e');
    expect(getByLabelText('border #2 width').value).toEqual('5');
    expect(getByLabelText('border #2 color').value).toEqual('#f48554');
    expect(getByLabelText('border #3 width').value).toEqual('5');
    expect(getByLabelText('border #3 color').value).toEqual('#fdbf59');
  });

  it('should render a preview element containing the borders set in the form', async () => {
    const { getByTitle } = await mount();
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 5px #DC424E',
      '0 0 0 10px #F48554',
      '0 0 0 15px #FDBF59'
    ].join(','));
  });

  it('should show the css code related to the generated preview', async () => {
    const { container } = await mount();
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent(
      'margin: 15px; box-shadow: 0 0 0 5px #dc424e, 0 0 0 10px #f48554, 0 0 0 15px #fdbf59;'
    );
  });

  it('should optionally remove a border', async () => {
    const { user, container, getByLabelText, getByTitle } = await mount();
    await user.click(getByLabelText('delete border #1'));
    expect(window.getComputedStyle(getByTitle('preview')).margin).toEqual('10px');
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 5px #F48554',
      '0 0 0 10px #FDBF59'
    ].join(','));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent(
      'margin: 10px; box-shadow: 0 0 0 5px #f48554, 0 0 0 10px #fdbf59;'
    );
  });

  it('should optionally add a border', async () => {
    const { user, container, getByRole, getByLabelText, getByTitle } = await mount();
    await user.click(getByRole('button', { name: 'Add Border' }));
    expect(getByLabelText('border #4 width').value).toEqual('5');
    expect(getByLabelText('border #4 color').value).toEqual('#4affff');
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 5px #DC424E',
      '0 0 0 10px #F48554',
      '0 0 0 15px #FDBF59',
      '0 0 0 20px #4AFFFF'
    ].join(','));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent([
      'margin: 20px;',
      'box-shadow: 0 0 0 5px #dc424e, 0 0 0 10px #f48554, 0 0 0 15px #fdbf59, 0 0 0 20px #4affff;'
    ].join(' '));
  });

  it('should optionally edit a border', async () => {
    const { user, container, getByLabelText, getByTitle } = await mount();
    const borderWidthInput = getByLabelText('border #3 width');
    const borderColorInput = getByLabelText('border #3 color');
    await user.clear(borderWidthInput);
    await user.type(borderWidthInput, '10');
    // fireEvent.input(borderColorInput, { target: { name: 'color', value: '#333333' }});
    setInputValue(borderColorInput, 'color', '#333333');
    expect(getByLabelText('border #3 width').value).toEqual('10');
    expect(getByLabelText('border #3 color').value).toEqual('#333333');
    expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
      '0 0 0 5px #DC424E',
      '0 0 0 10px #F48554',
      '0 0 0 20px #333333'
    ].join(','));
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent([
      'margin: 20px;',
      'box-shadow: 0 0 0 5px #dc424e, 0 0 0 10px #f48554, 0 0 0 20px #333333;'
    ].join(' '));
  });

  it('should optionally change preview preferences', async () => {
    const { user, getByRole, getByLabelText, getByTitle, getByText } = await mount();
    await user.click(getByRole('button', { name: 'Preferences' }));
    const preferences = {
      bgColor: {
        element: getByLabelText('Background Color'),
        value: '#222222'
      },
      fgColor: {
        element: getByLabelText('Foreground Color'),
        value: '#111111'
      },
      borderRadius: {
        element: getByLabelText('Border Radius'),
        value: '20'
      }
    };
    Object.entries(preferences).forEach(([name, { element, value }]) => {
      setInputValue(element, name, value);
    });
    expect(window.getComputedStyle(getByText('preview container')).backgroundColor).toEqual('rgb(34, 34, 34)');
    expect(window.getComputedStyle(getByTitle('preview')).backgroundColor).toEqual('rgb(17, 17, 17)');
    expect(window.getComputedStyle(getByTitle('preview')).borderRadius).toEqual('20%');
  });

  it('should contain credits', async () => {
    const { container } = await mount();
    const footer = container.querySelector('#footer');
    expect(within(footer).getByRole('link', { name: 'Rafael Camargo' })).toHaveAttribute(
      'href',
      'https://rafaelcamargo.com/?utm_source=bordiple'
    );
  });

  function setInputValue(inputEl, name, color){
    // Used fireEvent below because userEvent doesn’t
    // support interactions with color/range inputs:
    // https://github.com/testing-library/user-event/issues/423
    // https://github.com/testing-library/user-event/issues/871
    fireEvent.input(inputEl, { target: { name, value: color }});
  }
});
