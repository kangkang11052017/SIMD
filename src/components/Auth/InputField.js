import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { FormControl } from 'react-bootstrap';

class InputField extends PureComponent {
  static propTypes = {
    meta: object.isRequired,
    input: object.isRequired,
  };

  render() {
    const { input: { onChange, value }, meta: { error }, ...rest } = this.props;
    return (
      <Fragment>
        <FormControl
          {...rest}
          value={value}
          onChange={onChange}
        />
        { error && <strong>{error}</strong> }
      </Fragment>
    );
  }
}

export default InputField;
