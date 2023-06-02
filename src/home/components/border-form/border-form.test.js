import { render } from '@src/base/services/testing';
import { BorderForm } from './border-form';

describe('Border Form', () => {
  function mount(){
    return render(<BorderForm />);
  }

  it('should contain border identification', () => {
    const { getByText } = mount();
    expect(getByText('Border #1')).toBeInTheDocument();
    expect(getByText('Border #2')).toBeInTheDocument();
    expect(getByText('Border #3')).toBeInTheDocument();
  });
});
