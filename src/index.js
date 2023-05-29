import(/* webpackChunkName: 'taslonic-css' */ '@glorious/taslonic-react/dist/taslonic.css');
import(/* webpackChunkName: 'native-css' */ './index.styl');
import ReactDOM from 'react-dom';
import { Router } from './router';

export const mount = () => {
  const container = document.querySelector('[data-app]');
  container && ReactDOM.render(<Router />, container);
};

mount();
