import { asyncMount, userEvent, RouterMock } from '@src/base/services/testing';
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
});
