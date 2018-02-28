import React, { PureComponent, Fragment } from 'react';
import { Button, Checkbox, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: 'ABC',
    };
  }
  render() {
    console.log('state', this.state.form);
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
        </Form>

        <Button>Login</Button>
      </Fragment>
    );
  }
}

export default LoginForm;
