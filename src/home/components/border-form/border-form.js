import './border-form.styl';
import { Button, Col, Input, Form, Row, alert } from '@glorious/taslonic-react';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import {
  WIDTH_INPUT_NAME,
  COLOR_INPUT_NAME,
  isRemotionAllowed,
  buildNoBorderAlert,
  buildInputLabel,
  getValidations,
  isBorderValueValid
} from '@src/home/services/border-form/border-form';

export const BorderForm = () => {
  const { borders, setBorders } = useSharedBorders();
  const addBorder = () => setBorders([...borders, { width: 5, color: '#4AFFFF' }]);
  const removeBorder = borderIndex => {
    return isRemotionAllowed(borders) ?
      setBorders(borders.filter((_, index) => index !== borderIndex)) :
      alert.open(buildNoBorderAlert());
  };
  const editBorder = ({ target: { name, value } }, borderIndex) => {
    isBorderValueValid(getValidations(name), value) && setBorders(borders.map((border, index) => {
      return index === borderIndex ? { ...border, [name]: value } : border;
    }));
  };
  return (
    <Form className="b-border-form">
      {
        borders.map((border, index) => (
          <Row key={index} verticalAlignXs="center">
            <Col xs="3">
              <p className="b-border-form-id">
                <span>Border {`#${index+1}`}</span>
              </p>
            </Col>
            <Col xs="2">
              <Input
                type="number"
                name={WIDTH_INPUT_NAME}
                value={border[WIDTH_INPUT_NAME]}
                validations={getValidations(WIDTH_INPUT_NAME)}
                aria-label={buildInputLabel(WIDTH_INPUT_NAME, index)}
                onChange={evt => editBorder(evt, index)}
                block
              />
            </Col>
            <Col xs="5">
              <Input
                type="color"
                name={COLOR_INPUT_NAME}
                value={border[COLOR_INPUT_NAME]}
                aria-label={buildInputLabel(COLOR_INPUT_NAME, index)}
                onChange={evt => editBorder(evt, index)}
                block
              />
            </Col>
            <Col xs="2">
              <span className="b-border-form-delete-button-wrapper">
                <Button
                  aria-label={`delete border #${index+1}`}
                  onClick={() => removeBorder(index)}
                >
                  <span>×</span>
                </Button>
              </span>
            </Col>
          </Row>
        ))
      }
      <Row align="center">
        <Col xs="6">
          <Button theme="secondary" onClick={addBorder} block>
            Add Border
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
