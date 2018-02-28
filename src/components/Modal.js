import React, { PureComponent } from 'react';
import Input from './Input';

class Modal extends PureComponent {
  render() {
    return(
      <div>
        <Input id="name" type="text" placeholder="User name" />
        <Input id="email" type="email" placeholder="user@email.com" />
        <Input id="password" type="password" placeholder="password" />
        <button>Log In</button>
      </div>
    );
  };
}

export default Modal;
