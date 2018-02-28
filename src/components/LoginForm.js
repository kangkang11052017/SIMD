import React, { PureComponent, Fragment } from 'react';
import { Button, Checkbox, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { func } from 'prop-types';

class LoginForm extends PureComponent {
  static propTypes = {
    onLogin: func.isRequired,
  }

  render() {
    const { onLogin } = this.props;
    return (
      <Fragment>
        <Form horizontal>
          <FormGroup controlId="simedtriesteUserName">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              User Name / Email
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="Enter your user name" />
            </Col>
          </FormGroup>
          <FormGroup controlId="simedtriestePassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <FormControl type="password" />
            </Col>
          </FormGroup>
          <Checkbox>Remember me?</Checkbox>
        </Form>
        <Button onClick={onLogin}>Login</Button>
      </Fragment>
    );
  }
}

export default LoginForm;
