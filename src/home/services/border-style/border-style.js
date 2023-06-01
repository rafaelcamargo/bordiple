export const buildStyle = borders => {
  return getStyleStrategy(borders.length)(borders);
};

function getStyleStrategy(bordersCount){
  return {
    1: buildSingleBorderStyle,
    2: buildDoubleBorderStyle
  }[bordersCount] || buildMultiBorderStyle;
}

function buildSingleBorderStyle([{ width, color }]){
  return { border: `${formatPixelAmount(width)} solid ${color}` };
}

function buildDoubleBorderStyle([ first, second ]){
  return {
    ...buildSingleBorderStyle([first]),
    margin: formatPixelAmount(second.width),
    outline: `${formatPixelAmount(second.width)} solid ${second.color}`
  };
}

function buildMultiBorderStyle(borders){
  return borders.reduce(({ css, depth }, border) => {
    const thickness = parseInt(border.width) + depth;
    return {
      css: {
        margin: formatPixelAmount(thickness),
        boxShadow: [
          css.boxShadow,
          `0 0 0 ${formatPixelAmount(thickness)} ${border.color}`
        ].filter(val => !!val).join(', ')
      },
      depth: thickness
    };
  }, { css: {}, depth: 0 }).css;
}

function formatPixelAmount(width){
  return width === 0 ? width : `${width}px`;
}
