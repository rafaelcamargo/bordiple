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

  it('should not allow negative border width', async () => {
    const { user, getByLabelText, getByText } = await mount();
    const borderWidthInput = getByLabelText('border #1 width');
    await user.clear(borderWidthInput);
    await user.type(borderWidthInput, '-1');
    await user.tab();
    expect(getByText('Must be positive')).toBeInTheDocument();
  });

  it('should not allow less than one border', async () => {
    const NO_BORDER_ALERT = 'No reason to use this tool if you want no border, right?';
    const { user, getByLabelText, queryByText, getByRole } = await mount();
    await user.click(getByLabelText('delete border #3'));
    await user.click(getByLabelText('delete border #2'));
    expect(queryByText(NO_BORDER_ALERT)).not.toBeInTheDocument();
    await user.click(getByLabelText('delete border #1'));
    expect(queryByText(NO_BORDER_ALERT)).toBeInTheDocument();
    await user.click(getByRole('button', { name: 'Okay' }));
    expect(queryByText(NO_BORDER_ALERT)).not.toBeInTheDocument();
  });
});
