import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '@src/base/services/analytics';

export const RouterAnalytics = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    analyticsService.trackPageView();
  }, [location.pathname]);
  return <>{children}</>;
};
