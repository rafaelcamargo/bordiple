export const buildStyle = borders => {
  return getStyleStrategy(borders.length)(borders);
};

function getStyleStrategy(bordersCount){
  return {
    1: buildSingleBorderStyle
  }[bordersCount] || buildMultiBorderStyle;
}

function buildSingleBorderStyle([{ width, color }]){
  return { border: `${formatPixelAmount(parseBorderWidth(width))} solid ${color}` };
}

function buildMultiBorderStyle(borders){
  return borders.reduce(({ css, depth }, border) => {
    const thickness = parseBorderWidth(border.width) + depth;
    return {
      css: {
        margin: formatPixelAmount(thickness),
        boxShadow: [
          css.boxShadow,
          `0 0 0 ${formatPixelAmount(thickness)} ${border.color}`
        ].filter(val => !!val).join(',')
      },
      depth: thickness
    };
  }, { css: {}, depth: 0 }).css;
}

function formatPixelAmount(width){
  return width === 0 ? `${width}` : `${width}px`;
}

function parseBorderWidth(width){
  const value = parseInt(width);
  return value && value >= 0 ? value : 0;
}
