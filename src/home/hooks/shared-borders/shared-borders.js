import { createSharedState } from '@src/base/factories/shared-state';
export const useSharedBorders = createSharedState(buildInitialBorders());

function buildInitialBorders(){
  return [
    { width: 5, color: '#DC424E' },
    { width: 5, color: '#F48554' },
    { width: 5, color: '#FDBF59' },
  ];
}
