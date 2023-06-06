import { createSharedState } from '@src/base/factories/shared-state';

export const BG_COLOR = 'bgColor';
export const FG_COLOR = 'fgColor';
export const BORDER_RADIUS = 'borderRadius';
export const useSharedPreferences = createSharedState(buildInitialPreferences());

function buildInitialPreferences(){
  return {
    [BG_COLOR]: '#ffffff',
    [FG_COLOR]: '#ffffff',
    [BORDER_RADIUS]: '10'
  };
}
