import { CustomRouter, Routes, Route } from '@src/base/components/router/router';
import { HomeView } from '@src/home/views/home-view';
import routes from '@src/routes';

export const Router = () => {
  return (
    <CustomRouter>
      <Routes>
        {routes.map(({ path, name }) => {
          const ViewComponent = getViewComponentByViewName(name);
          return <Route path={path} element={<ViewComponent />} key={name} />;
        })}
      </Routes>
    </CustomRouter>
  );
};

function getViewComponentByViewName(viewName){
  return {
    'home': HomeView
  }[viewName];
}
