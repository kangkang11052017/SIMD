import React, { PureComponent, Fragment } from 'react';
import { func } from 'prop-types';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

class SignUpForm extends PureComponent {
  static propTypes = {
    onLoginRequest: func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      form: 'ABC',
    };
  }

  onSubmitHandler = () => {
    console.log(this.state.form);
    this.props.onLoginRequest();
  }

  getFormRef = (form) => {
    this.form = form;
  }
  render() {
    console.log('state', this.state.form);
    console.log('ref', this.form);
    return (
      <Fragment>
        <Form horizontal ref={this.getFormRef}>
          <FormGroup controlId="simedtriesteUserName">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              User Name
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="Enter your user name" />
            </Col>
          </FormGroup>
          <FormGroup controlId="simedtriesteEmail">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Email
            </Col>
            <Col sm={4}>
              <FormControl type="email" placeholder="your_mail@domain.com" />
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
        </Form>
        <Button onClick={this.onSubmitHandler}>Sign Up</Button>
      </Fragment>
    );
  }
}

export default SignUpForm;
