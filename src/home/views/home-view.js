import './home-view.styl';
import { BorderForm } from '@src/home/components/border-form/border-form';

export const HomeView = () => {
  return (
    <>
      <h1 className="b-home-view-heading">Bordiple</h1>
      <BorderForm />
    </>
  );
};
