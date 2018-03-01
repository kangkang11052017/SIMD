import React, { PureComponent, Fragment } from 'react';
import { func } from 'prop-types';
import { Button, Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { noop } from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';

class SignUpForm extends PureComponent {
  static propTypes = {
    onSignUp: func.isRequired,
    handleSubmit: func.isRequired,
  }

  render() {
    const { handleSubmit, onSignUp } = this.props;
    return (
      <Fragment>
        <Form horizontal ref={this.getFormRef}>
          <FormGroup controlId="simedtriesteUserName">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              User Name
            </Col>
            <Col sm={4}>
              <Field
                name="userName"
                type="text"
                placeholder="Enter your user name"
                component={InputField}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="simedtriesteEmail">
            <Col componentClass={ControlLabel} smOffset={2} sm={2}>
              Email
            </Col>
            <Col sm={4}>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                component={InputField}
                onChange={noop}
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
                placeholder="Enter your password"
                component={InputField}
              />
            </Col>
          </FormGroup>
        </Form>
        <Button onClick={handleSubmit(onSignUp)}>Sign Up</Button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSubmitUser: () => {
      dispatch(noop);
    },
  };
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'SIGN_UP',
})(SignUpForm));
