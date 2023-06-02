import './viewport.styl';
import { Footer } from '@src/base/components/footer/footer';
import { Topbar } from '@src/base/components/topbar/topbar';

export const Viewport = ({ children }) => {
  return (
    <main className="b-viewport">
      <Topbar />
      {children}
      <Footer />
    </main>
  );
};
