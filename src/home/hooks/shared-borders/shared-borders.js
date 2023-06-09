import { createUrlSharedState } from '@src/base/factories/url-shared-state';

export const useSharedBorders = createUrlSharedState({
  initialState: buildInitialBorders(),
  searchParamName: 'b',
  parseSearchParam: param => JSON.parse(atob(param))
});

function buildInitialBorders(){
  return [
    { width: 5, color: '#DC424E' },
    { width: 5, color: '#F48554' },
    { width: 5, color: '#FDBF59' },
  ];
}
