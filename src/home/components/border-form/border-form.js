import { Button, Col, Input, Form, Row } from '@glorious/taslonic-react';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';

const WIDTH_INPUT_NAME = 'width';
const COLOR_INPUT_NAME = 'color';

export const BorderForm = () => {
  const { borders, setBorders } = useSharedBorders();
  const removeBorder = borderIndex => {
    setBorders(borders.filter((_, index) => index !== borderIndex));
  };
  return (
    <Form>
      {
        borders.map((border, index) => (
          <Row key={index}>
            <Col xs="5">
              <Input
                type="number"
                name={WIDTH_INPUT_NAME}
                value={border[WIDTH_INPUT_NAME]}
                aria-label={buildInputLabel(WIDTH_INPUT_NAME, index)}
                block
              />
            </Col>
            <Col xs="5">
              <Input
                type="color"
                name={COLOR_INPUT_NAME}
                value={border[COLOR_INPUT_NAME]}
                aria-label={buildInputLabel(COLOR_INPUT_NAME, index)}
                block
              />
            </Col>
            <Col xs="1">
              <Button
                aria-label={`delete border #${index+1}`}
                onClick={() => removeBorder(index)}
              >
                ×
              </Button>
            </Col>
          </Row>
        ))
      }
    </Form>
  );
};

function buildInputLabel(attributeType, borderIndex){
  return `border #${borderIndex+1} ${attributeType}`;
}
