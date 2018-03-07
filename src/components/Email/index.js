import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Modal, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { compose } from 'recompose';
import InputField from '../Auth/InputField';

class Email extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    onClose: func.isRequired,
    onSend: func.isRequired,
    handleSubmit: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpenModal: nextProps.isOpen,
      };
    });
  }

  onsendMail = () => {
    this.props.onClose();
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpenModal: false,
      };
    });
    reset('EMAIL');
  }

  render() {
    const { onSend, handleSubmit } = this.props;
    return (
      <div className="modal-container">
        <Modal container={this} autoFocus show={this.state.isOpenModal} onHide={this.onsendMail} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Send temperature regulation information to operators</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Col componentclass={ControlLabel} smOffset={2} sm={2}>
                Email
              </Col>
              <Col sm={6}>
                <Field
                  name="email"
                  component={InputField}
                  type="text"
                  placeholder="Enter email who will be notifified by temperarture changes"
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentclass={ControlLabel} smOffset={2} sm={2}>
                Content
              </Col>
              <Col sm={6}>
                <Field
                  name="content"
                  component={InputField}
                  type="text"
                  placeholder="Enter the content will be notifified by temperarture changes"
                />
              </Col>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit(onSend)}>Send</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const enhancers = [
  connect(null),
  reduxForm({
    form: 'EMAIL',
  }),
];

export default compose(...enhancers)(Email);
