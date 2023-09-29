import ENV from '@environment';
import Staly from '@compilorama/staly';

let analytics;

const _public = {};

_public.init = () => {
  const { DOMAIN, OPTIONS } = ENV.ANALYTICS.PLAUSIBLE;
  analytics = new Staly();
  analytics.init(DOMAIN, OPTIONS);
};

_public.trackPageView = () => analytics.trackPageview();

export default _public;
