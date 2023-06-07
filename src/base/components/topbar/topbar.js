import './topbar.styl';
import '@src/base/components/spoonarm/spoonarm';
import { Container, Row, Col } from '@glorious/taslonic-react';

export const Topbar = () => {
  return (
    <header className="b-topbar">
      <Container>
        <Row>
          <Col>
            <div className="b-topbar-content">
              <h1>Bordiple</h1>
              <b-spoonarm repo="rafaelcamargo/bordiple"></b-spoonarm>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
