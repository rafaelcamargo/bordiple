const _public = {};

_public.isServiceWorkersAvailable = () => !!getServiceWorkerAPI();

_public.registerServiceWorker = filepath => getServiceWorkerAPI().register(filepath);

function getServiceWorkerAPI(){
  return navigator.serviceWorker;
}

export default _public;
