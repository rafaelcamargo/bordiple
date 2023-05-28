import './home-view.styl';
import { BorderCode } from '@src/home/components/border-code/border-code';
import { BorderForm } from '@src/home/components/border-form/border-form';
import { BorderPreview } from '@src/home/components/border-preview/border-preview';

export const HomeView = () => {
  return (
    <>
      <h1 className="b-home-view-heading">Bordiple</h1>
      <BorderPreview />
      <BorderForm />
      <BorderCode />
    </>
  );
};
