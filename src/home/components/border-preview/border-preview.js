import './border-preview.styl';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import {
  useSharedPreferences,
  BG_COLOR,
  FG_COLOR,
  BORDER_RADIUS
} from '@src/home/hooks/shared-preferences/shared-preferences';
import { buildStyle } from '@src/home/services/border-style/border-style';

export const BorderPreview = () => {
  const [borders] = useSharedBorders();
  const [preferences] = useSharedPreferences();
  return (
    <div
      className="b-border-preview-container"
      style={{ backgroundColor: preferences[BG_COLOR] }}
    >
      preview container
      <div
        className="b-border-preview"
        title="preview"
        style={buildPreviewStyle(borders, preferences)}
      >
      </div>
    </div>
  );
};

function buildPreviewStyle(borders, preferences){
  return {
    ...buildStyle(borders),
    backgroundColor: preferences[FG_COLOR],
    borderRadius: `${preferences[BORDER_RADIUS]}%`
  };
}
