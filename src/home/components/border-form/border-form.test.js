import { asyncMount } from '@src/base/services/testing';
import { BorderForm } from './border-form';

describe('Border Form', () => {
  async function mount(){
    return await asyncMount(<BorderForm />);
  }

  it('should contain border identification', async () => {
    const { getByText } = await mount();
    expect(getByText('Border #1')).toBeInTheDocument();
    expect(getByText('Border #2')).toBeInTheDocument();
    expect(getByText('Border #3')).toBeInTheDocument();
  });

  it('should not allow negative border width ', async () => {
    const { user, getByLabelText, getByText } = await mount();
    const borderWidthInput = getByLabelText('border #1 width');
    await user.clear(borderWidthInput);
    await user.type(borderWidthInput, '-1');
    await user.tab();
    expect(getByText('Must be positive')).toBeInTheDocument();
  });
});
