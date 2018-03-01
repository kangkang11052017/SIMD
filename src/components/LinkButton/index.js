import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-route-dom';
import { func, string } from 'prop-types';

const LinkButton = (props) => {
  return (
    <Link exact to={`${props.to}`}>
      <Button onClick={props.handleClick}>
        {props.title}
      </Button>
    </Link>
  );
};

LinkButton.propTypes = {
  to: string.isRequired,
  title: string.isRequired,
  handleClick: func.isRequired,
};

export default LinkButton;
