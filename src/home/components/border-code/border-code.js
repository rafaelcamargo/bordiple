import './border-code.styl';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { buildStyle } from '@src/home/services/border-style/border-style';

export const BorderCode = () => {
  const { borders } = useSharedBorders();
  return (
    <pre id="codeWrapper" className="b-border-code">
      <code>{stringify(buildStyle(borders))}</code>
    </pre>
  );
};

function stringify(styleObject){
  return Object.entries(styleObject).map(([attr, value]) => {
    return `${mapCSSAtributeKey(attr)}: ${indentCSSValue(value)};`;
  }).join('\n');
}

function mapCSSAtributeKey(styleObjectKey){
  return {
    'boxShadow': 'box-shadow'
  }[styleObjectKey] || styleObjectKey;
}

function indentCSSValue(value){
  return value.includes(',') ? value.split(',').map(val => `\n  ${val.toLowerCase()}`) : value.toLowerCase();
}
