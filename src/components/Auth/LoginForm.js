import React, { PureComponent, Fragment } from 'react';
import { Button, Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { func, bool, object } from 'prop-types';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';

class LoginForm extends PureComponent {
  static propTypes = {
    onLogin: func.isRequired,
    handleSubmit: func.isRequired,
    logged: bool.isRequired,
    history: object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged) {
      this.props.history.push('/landingpage');
    }
  }

  render() {
    const { handleSubmit, onLogin } = this.props;
    return (
      <Fragment>
        <Form horizontal>
          <FormGroup controlId="simedtriesteUserName">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              User Name
            </Col>
            <Col sm={4}>
              <Field
                name="userName"
                component={InputField}
                type="text"
                placeholder="Enter your user name"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="simedtriestePassword">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Password
            </Col>
            <Col sm={4}>
              <Field
                name="password"
                type="password"
                component={InputField}
                placeholder="Enter your password"
              />
            </Col>
          </FormGroup>
          {/* <Checkbox>Remember me?</Checkbox> */}
          <Button onClick={handleSubmit(onLogin)}>Login</Button>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(reduxForm({
  form: 'LOGIN',
})(LoginForm));

