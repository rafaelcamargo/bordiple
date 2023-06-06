import { Col, Input, Field, Form, Row } from '@glorious/taslonic-react';
import {
  useSharedPreferences,
  BG_COLOR,
  FG_COLOR,
  BORDER_RADIUS
} from '@src/home/hooks/shared-preferences/shared-preferences';

export const PreferencesForm = () => {
  const [preferences, setPreferences] = useSharedPreferences();
  const editPreferences = ({ target: { name, value } }) => {
    setPreferences(prevState => ({ ...prevState, [name]: value }));
  };
  return (
    <Form>
      <Row>
        <Col xs="6">
          <Field label="Background Color" block>
            <Input
              type="color"
              name={BG_COLOR}
              value={preferences[BG_COLOR]}
              onChange={editPreferences}
              block
            />
          </Field>
        </Col>
        <Col xs="6">
          <Field label="Foreground Color" block>
            <Input
              type="color"
              name={FG_COLOR}
              value={preferences[FG_COLOR]}
              onChange={editPreferences}
              block
            />
          </Field>
        </Col>
      </Row>
      <Row>
        <Col>
          <Field label="Border Radius" block>
            <Input
              type="range"
              name={BORDER_RADIUS}
              value={preferences[BORDER_RADIUS]}
              onChange={editPreferences}
              min="0"
              max="50"
              block
            />
          </Field>
        </Col>
      </Row>
    </Form>
  );
};
