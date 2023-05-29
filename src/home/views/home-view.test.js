import { asyncMount, userEvent, RouterMock, waitFor } from '@src/base/services/testing';
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
    user.click(getByLabelText('delete border #1'));
    await waitFor(() => {
      expect(window.getComputedStyle(getByTitle('preview')).boxShadow).toEqual([
        '0 0 0 10px #F48554',
        '0 0 0 20px #FDBF59'
      ].join(', '));
    });
    expect(container.querySelector('#codeWrapper > code')).toHaveTextContent(
      'margin: 20px; box-shadow: 0 0 0 10px #F48554, 0 0 0 20px #FDBF59;'
    );
  });
});
