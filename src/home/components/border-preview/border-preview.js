import './border-preview.styl';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { buildStyle } from '@src/home/services/border-style/border-style';

export const BorderPreview = () => {
  const [borders] = useSharedBorders();
  return (
    <div className="b-border-preview-container">
      <div
        className="b-border-preview"
        title="preview"
        style={buildStyle(borders)}
      >
      </div>
    </div>
  );
};
