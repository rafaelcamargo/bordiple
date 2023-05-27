import './index.styl';
import ReactDOM from 'react-dom';
import { Router } from './router';

export const mount = () => {
  const container = document.querySelector('[data-app]');
  container && ReactDOM.render(<Router />, container);
};

mount();
