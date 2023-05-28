import { Col, Input, Form, Row } from '@glorious/taslonic-react';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';

const WIDTH_INPUT_NAME = 'width';
const COLOR_INPUT_NAME = 'color';

export const BorderForm = () => {
  const { borders } = useSharedBorders();
  return (
    <Form>
      {
        borders.map((border, index) => (
          <Row key={index}>
            <Col xs="6">
              <Input
                type="number"
                name={WIDTH_INPUT_NAME}
                value={border[WIDTH_INPUT_NAME]}
                aria-label={buildInputLabel(WIDTH_INPUT_NAME, index)}
                block
              />
            </Col>
            <Col xs="6">
              <Input
                type="color"
                name={COLOR_INPUT_NAME}
                value={border[COLOR_INPUT_NAME]}
                aria-label={buildInputLabel(COLOR_INPUT_NAME, index)}
                block
              />
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
