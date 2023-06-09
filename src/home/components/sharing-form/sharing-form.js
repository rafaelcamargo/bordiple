import '@src/base/components/pilc/pilc';
import { Col, Input, Form, Row } from '@glorious/taslonic-react';
import { useSharedBorders } from '@src/home/hooks/shared-borders/shared-borders';
import { useSharedPreferences } from '@src/home/hooks/shared-preferences/shared-preferences';

export const SharingForm = () => {
  const [borders] = useSharedBorders();
  const [preferences] = useSharedPreferences();
  const link = buildSharingLink(borders, preferences);
  return (
    <Form className="b-sharing-form">
      <Row>
        <Col>
          <Input
            aria-label="sharing link"
            value={link}
            readOnly
            block
          />
        </Col>
      </Row>
      <Row align="center">
        <Col xs="6" sm="4">
          <b-pilc data-text={link} data-style="display: block; width: 100%;"></b-pilc>
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
