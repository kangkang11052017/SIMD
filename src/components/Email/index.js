import React, { PureComponent } from 'react';
import { Email, Item, Span, A, Image, Box } from 'react-html-email';

class Email extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => {
      return {
        ...prevState,
        tittle: nextProps.title,
      };
    });
  }
  CSS = `
  @media only screen and (max-device-width: 480px) {
    font-size: 20px !important;
  }`.trim();

  render() {
    return (
      <Email title="test mail" headCSS={this.CSS}>
        <Item>
          <Span fontSize={15}>Hello React!</Span>
        </Item>
        <Item>
          <Box cellSpacing={20} width="100%" style={{ borderTop: '3px solid black' }}>
            <Item>
              <Span color="gray" lineHeight={20}>Generated by <A href="https://github.com/chromakode/react-html-email">react-html-email</A></Span>
              <Image data-mc-bar="bar" data-mc-baz="baz" alt="react" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/100px-React.js_logo.svg.png" width={100} height={100} />
              <A download={sourceURL} href={sourceURL}>Source code</A>
            </Item>
          </Box>
        </Item>
      </Email>
    );
  }
}

export default Email;