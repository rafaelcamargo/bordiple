import './border-code.styl';
import '@src/base/components/pilc/pilc';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { buildStyle } from '@src/home/services/border-style/border-style';

export const BorderCode = () => {
  const [borders] = useSharedBorders();
  const code = stringify(buildStyle(borders));
  return (
    <pre id="codeWrapper" className="b-border-code">
      <code>{code}</code>
      <b-pilc
        data-text={code}
        data-style="position: absolute; top: 10px; right: 10px;"
      ></b-pilc>
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
