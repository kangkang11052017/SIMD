import React, { PureComponent, Fragment } from 'react';
import { Button, Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { func, bool, object, array } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import { fetchUsers } from './actions';
import { URL } from '../../constants';

class LoginForm extends PureComponent {
  static propTypes = {
    onLogin: func.isRequired,
    handleSubmit: func.isRequired,
    logged: bool.isRequired,
    history: object.isRequired,
    users: array.isRequired,
    dispatchFetchUsers: func.isRequired,
  }

  componentDidMount() {
    this.props.dispatchFetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged) {
      this.props.history.push(URL.LANDING);
    }
  }

  render() {
    const { handleSubmit, onLogin, users } = this.props;
    console.log('users', users);
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

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    users: state.users.get('users'),
    isLoading: state.users.get('isLoading'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchUsers: () => {
      dispatch(fetchUsers.start());
    },
  };
};

const enhancers = [
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  reduxForm({
    form: 'LOGIN',
  }),
];

export default compose(...enhancers)(LoginForm);

