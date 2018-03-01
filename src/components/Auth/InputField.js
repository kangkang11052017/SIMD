import React, { PureComponent, Fragment } from 'react';
import { string, object } from 'prop-types';
import { FormControl } from 'react-bootstrap';

class InputField extends PureComponent {
  static propTypes = {
    error: string,
    input: object.isRequired,
  };

  static defaultProps = {
    error: '',
  };

  render() {
    const { input, error } = this.props;
    return (
      <Fragment>
        <FormControl
          {...this.props}
          value={input.value}
          onChange={input.onChange}
        />
        { error && <strong>{error}</strong> }
      </Fragment>
    );
  }
}

export default InputField;
