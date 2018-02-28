import React, { PureComponent } from 'react';
import CSVReader from 'react-csv-reader';
import { Jumbotron, Table } from 'react-bootstrap';
import { head, slice, map } from 'lodash';
import Styles from '../App.css';

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
      <Table responsive stripped hover>
        <thead>
          {
            <tr>
              {
                map(header, (th) => {
                  return (<th>{th}</th>);
                })
              }
            </tr>
          }
        </thead>
        <tbody>
          {
            map(content, (row) => {
              return (
                <tr>
                  {
                    map(row, (td) => {
                      return (
                        <td>{td}</td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>
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
          <CSVReader
            label="Select csv file"
            cssClass="react-csv-input"
            onFileLoaded={this.onDataHandle}
          />
        </Jumbotron>
        {this.state.table}
      </div>
    );
  }
}

export default LandingPage;
