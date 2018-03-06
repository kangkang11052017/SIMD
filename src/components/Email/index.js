import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import effects from './effects';
import { Modal, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class Email extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    onClose: func.isRequired,
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

  onSendEmail = () => {
    this.props.onClose();
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpenModal: false,
      };
    });
  }

  render() {
    console.log('ths.state', this.state);
    return (
      <div className="modal-container">
        <Modal container={this} autoFocus show={this.state.isOpenModal} onHide={this.onSendEmail} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Send temperature regulation information to operators</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Messages</h4>
            <FormGroup>
              <ControlLabel>Content</ControlLabel>
              <FormControl
                type="text"
                placeholder="Today temperature"
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSendEmail}>Send</Button>
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
export { effects };
