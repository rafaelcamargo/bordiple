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
});
