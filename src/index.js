import(/* webpackChunkName: 'workers' */ '@src/base/services/workers');
import '@glorious/taslonic-react/dist/taslonic.css';
import './index.styl';
import ReactDOM from 'react-dom';
import { Router } from './router';
import analyticsService from '@src/base/services/analytics';

export const mount = () => {
  const container = document.querySelector('[data-app]');
  if(container) {
    analyticsService.init();
    ReactDOM.render(<Router />, container);
  }
};

mount();
