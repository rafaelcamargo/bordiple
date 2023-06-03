export const WIDTH_INPUT_NAME = 'width';
export const COLOR_INPUT_NAME = 'color';

export const isRemotionAllowed = borders => {
  return borders.length > 1;
};

export const buildNoBorderAlert = () => {
  return {
    content: 'No reason to use this tool if you want no border, right?',
    dismissButtonText: 'Okay',
    width: '300px'
  };
};

export const buildInputLabel = (attributeType, borderIndex) => {
  return `border #${borderIndex+1} ${attributeType}`;
};

export const getValidations = attr => {
  return {
    [WIDTH_INPUT_NAME]: [
      { isValid: val => parseInt(val) >= 0, errorMessage: 'Must be positive' }
    ]
  }[attr];
};

export const isBorderValueValid = (validations, value) => {
  return !validations || validations.reduce((result, { isValid }) => {
    return result && isValid(value);
  }, true);
};
