import React, { PureComponent } from 'react';
import CSVReader from 'react-csv-reader';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Jumbotron, Table, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { head, slice, map, upperCase, find } from 'lodash';
import uuid from 'uuid';
import Styles from './LandingPage.css';
import { URL, DAYS, CHART } from '../../constants';

class LandingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: null,
      simedConfig: null,
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
    // const datasets = {
    //   room1: {
    //     actual: [],
    //     predict: [],
    //   },
    // };
    const roomConfig = {
      month1: {
        room1: {
          bk: null,
          ek: null,
        },
      },
    };
    const simedConfig = map(content, (record) => {
      const [month, room, bk, ek] = record;
      roomConfig[`month${month}`] = { ...roomConfig[`month${month}`] };
      roomConfig[`month${month}`][`room${room}`] = { bk, ek };
      return {
        month, room, bk, ek,
      };
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        table,
        simedConfig,
        roomConfig,
      };
    });
  };

  data = {
    labels: DAYS,
    datasets: [
      {
        ...CHART.ACTUAL,
        data: [33, 23, 29, 40, 45, 47, 48, 50, 17, 19, 23, 11, 13, 19, 17, 18],
      },
      {
        ...CHART.PREDICT,
        data: [32, 29, 27, 35, 39, 40, 45, 48, 41, 33, 22, 18, 18, 12, 13, 20],
      },
    ],
  };

  render() {
    const room1 = this.state.simedConfig && find(this.state.simedConfig, (room) => {
      return room.room === '1' && room.month === '12';
    });
    return (
      <div>
        <Link to={URL.HOME}>Logout</Link>
        <Jumbotron bsStyle={Styles.landingpage}>
          <Col smOffset={2} sm={8}>
            <CSVReader
              label="Select csv file to dictate the relative between Actual/Predict Temperature"
              cssClass="react-csv-input"
              onFileLoaded={this.onDataHandle}
            />
          </Col>
        </Jumbotron>
        <Col sm={6} className={Styles.chart}>
          <Line data={this.data} />
        </Col>
        <Col sm={6}>
          <Line data={this.data} />
        </Col>
        <Col sm={6}>
          <Line data={this.data} />
        </Col>
        <Col sm={6}>
          <Line data={this.data} />
        </Col>
        <Col sm={6}>
          <Line data={this.data} />
        </Col>
        {this.state.table}
      </div>
    );
  }
}

export default withRouter(LandingPage);
