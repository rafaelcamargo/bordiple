import { createUrlSharedState } from '@src/base/factories/url-shared-state';

export const BG_COLOR = 'bgColor';
export const FG_COLOR = 'fgColor';
export const BORDER_RADIUS = 'borderRadius';
export const useSharedPreferences = createUrlSharedState({
  initialState: buildInitialPreferences(),
  searchParamName: 'p',
  parseSearchParam: param => JSON.parse(atob(param))
});

function buildInitialPreferences(){
  return {
    [BG_COLOR]: '#ffffff',
    [FG_COLOR]: '#ffffff',
    [BORDER_RADIUS]: '10'
  };
}
