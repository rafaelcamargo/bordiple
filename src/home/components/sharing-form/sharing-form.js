import { Col, Input, Form, Row } from '@glorious/taslonic-react';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { useSharedPreferences } from '@src/home/hooks/shared-preferences/shared-preferences';

export const SharingForm = () => {
  const [borders] = useSharedBorders();
  const [preferences] = useSharedPreferences();
  return (
    <Form>
      <Row>
        <Col>
          <Input
            aria-label="sharing link"
            value={buildSharingLink(borders, preferences)}
            readOnly
            block
          />
        </Col>
      </Row>
    </Form>
  );
};

function buildSharingLink(borders, preferences){
  return `${window.location.origin}/?b=${encode(borders)}&p=${encode(preferences)}`;
}

function encode(obj){
  return btoa(JSON.stringify(obj)).replace(/=/g, '');
}
