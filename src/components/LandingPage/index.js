import React, { PureComponent } from 'react';
import CSVReader from 'react-csv-reader';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Jumbotron, Table, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { head, slice, map, upperCase, range } from 'lodash';
import uuid from 'uuid';
import Styles from './LandingPage.css';
import { URL, DAYS, CHART } from '../../constants';

class LandingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: null,
      roomConfig: null,
      temperatureObj: null,
    };
  }

  onConfigHandle = (rawData) => {
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
    const roomConfig = {};
    const simedConfig = map(content, (record) => {
      const [month, room, bk, ek] = record;
      if (month) {
        roomConfig[`${month - 1}`] = { ...roomConfig[`${month - 1}`] };
        roomConfig[`${month - 1}`][`${room}`] = { bk: Number(bk), ek: Number(ek) };
      }
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

  onDataHandle = (temperatureData) => {
    const dataContent = slice(temperatureData, 1);
    const temperatureObj = {};
    map(range(0, 12), (month) => {
      temperatureObj[month] = {};
      map(range(0, CHART[month]), (day) => {
        temperatureObj[month][day] = [];
      });
    });
    map(dataContent, (min) => {
      const date = new Date(min[0]);
      const day = date.getDate();
      const month = date.getMonth();
      if (month && day) {
        temperatureObj[month][day].push(Number(min[1]));
      }
    });
    map(temperatureObj, (month, im) => {
      map(month, (day, id) => {
        if (day.length > 1) {
          const average = day.reduce((acc, nextValue) => {
            return acc + Number(nextValue);
          }) / day.length;
          temperatureObj[im][id] = average;
        }
      });
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        temperatureObj,
      };
    });
  }
  onSendEmail = () => {
    alert('Send Email to your operator!');
  }

  getChartData = (state) => {
    const { roomConfig, temperatureObj } = state;
    if (roomConfig && temperatureObj) {
      map(roomConfig, (rooms, month) => {
        console.log('month', month);
        console.log('room', rooms);
        map(rooms, (room) => {
          map(temperatureObj[month], (day) => {
            console.log('day - room', day, ' - ', room);
            console.log('temparature', day + rooms[room].ek);
          });
        });
      });
    }

    console.log('roomConfig', roomConfig);
    console.log('temperatureObj', temperatureObj);
  }

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
    this.getChartData(this.state);
    return (
      <div>
        <Button>
          <Link to={URL.HOME}>Logout</Link>
        </Button>
        <Button onClick={this.onSendEmail}>Send Email</Button>
        <Jumbotron bsStyle={Styles.landingpage}>
          <Col smOffset={1} sm={4}>
            <CSVReader
              label="Select system config (Room, b(k), e(k))"
              cssClass="react-csv-input"
              onFileLoaded={this.onConfigHandle}
            />
          </Col>
          <Col smOffset={1} sm={4}>
            <CSVReader
              label="Select temperature statistics (c(k))"
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
