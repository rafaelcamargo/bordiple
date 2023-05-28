import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { buildStyle } from '@src/home/services/border-style/border-style';

export const BorderPreview = () => {
  const { borders } = useSharedBorders();
  return (
    <div title="preview" style={buildStyle(borders)}></div>
  );
};
