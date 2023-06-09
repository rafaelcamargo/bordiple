import './home-view.styl';
import { Container, Row, Col } from '@glorious/taslonic-react';
import { Tabs, Tab } from '@src/base/components/tabs/tabs';
import { Viewport } from '@src/base/components/viewport/viewport';
import { BorderCode } from '@src/home/components/border-code/border-code';
import { BorderForm } from '@src/home/components/border-form/border-form';
import { BorderPreview } from '@src/home/components/border-preview/border-preview';
import { PreferencesForm } from '@src/home/components/preferences-form/preferences-form';
import { SharingForm } from '@src/home/components/sharing-form/sharing-form';

export const HomeView = () => {
  return (
    <Viewport>
      <BorderPreview />
      <Tabs>
        <Tab label="Borders">
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
        </Tab>
        <Tab label="Preferences">
          <Container>
            <Row align="center">
              <Col sm="6">
                <PreferencesForm />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab label="Share">
          <Container>
            <Row align="center">
              <Col sm="6">
                <SharingForm />
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </Viewport>
  );
};
