import React, { PureComponent } from 'react';
import CSVReader from 'react-csv-reader';
import { withRouter } from 'react-router';
import { Jumbotron, Table, Col } from 'react-bootstrap';
import { head, slice, map, upperCase } from 'lodash';
import uuid from 'uuid';
import Styles from './LandingPage.css';

class LandingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: null,
    };
  }

  onDataHandle = (rawData) => {
    const header = head(rawData);
    const content = slice(rawData, 1, rawData.length);
    const table = (
      <Col smOffset={2} sm={8}>
        <Table responsive striped hover>
          <thead>
            {
              <tr>
                {
                  map(header, (th) => {
                    return (<th key={th}>{upperCase(th)}</th>);
                  })
                }
              </tr>
            }
          </thead>
          <tbody>
            {
              map(content, (row) => {
                const trId = uuid();
                return (
                  <tr key={trId}>
                    {
                      map(row, (td) => {
                        const tdId = uuid();
                        return (
                          <td key={tdId}>{td}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Col>
    );
    this.setState((prevState) => {
      return {
        ...prevState,
        table,
      };
    });
  };
  render() {
    return (
      <div>
        <Jumbotron bsStyle={Styles.landingpage}>
          <Col smOffset={2} sm={8}>
            <CSVReader
              label="Select csv file to dictate the relative between Actual/Predict Temperature"
              cssClass="react-csv-input"
              onFileLoaded={this.onDataHandle}
            />
          </Col>
        </Jumbotron>
        {this.state.table}
      </div>
    );
  }
}

export default withRouter(LandingPage);
