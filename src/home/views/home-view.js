import './home-view.styl';
import { Container, Row, Col } from '@glorious/taslonic-react';
import { Viewport } from '@src/base/components/viewport/viewport';
import { BorderCode } from '@src/home/components/border-code/border-code';
import { BorderForm } from '@src/home/components/border-form/border-form';
import { BorderPreview } from '@src/home/components/border-preview/border-preview';

export const HomeView = () => {
  return (
    <Viewport>
      <BorderPreview />
      <Container>
        <Row>
          <Col sm="6">
            <BorderForm />
          </Col>
          <Col sm="6">
            <BorderCode />
          </Col>
        </Row>
      </Container>
    </Viewport>
  );
};
