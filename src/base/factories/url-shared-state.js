import { useEffect } from 'react';
import { createSharedState } from '@src/base/factories/shared-state';

export const createUrlSharedState = ({
  initialState,
  searchParamName,
  parseSearchParam
}) => {
  const useSharedState = createSharedState(initialState);
  return () => {
    const [state, setState] = useSharedState();
    const searchString = window.location.search;
    useEffect(() => {
      const searchParamState = getSearchParamState(
        searchString,
        searchParamName,
        parseSearchParam
      );
      searchParamState && setState(searchParamState);
    }, [searchString]);
    return [state, setState];
  };
};

function getSearchParamState(searchString, searchParamName, parseSearchParam){
  const params = new URLSearchParams(searchString);
  const state = params.get(searchParamName);
  return state && parseSearchParam(state);
}
