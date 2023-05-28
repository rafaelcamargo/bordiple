export const buildStyle = borders => {
  return borders.reduce(({ css, depth }, border) => {
    const thickness = border.width + depth;
    return {
      css: {
        margin: `${thickness}px`,
        boxShadow: [
          css.boxShadow,
          `0 0 0 ${thickness}px ${border.color}`
        ].filter(val => !!val).join(', ')
      },
      depth: thickness
    };
  }, { css: {}, depth: 0 }).css;
};
