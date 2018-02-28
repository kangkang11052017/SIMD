import React, { PureComponent } from 'react';

class Input extends PureComponent {
  render() {
    return (
      <div>
        <input id={this.props.name} autocomplete="false" required type={this.props.type} placeholder={this.props.placeholder} />
        <label for={this.props.name}></label>
      </div>
    );
  }
}

export default Input;
