import React, { Component } from 'react';
import { object, func } from 'prop-types';
import CSVReader from 'react-csv-reader';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Col, Panel, Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { slice, map, range } from 'lodash';
import uuid from 'uuid';
import Email from '../Email';
import Styles from './LandingPage.css';
import reducers from './reducers';
import mailReducers from './sendMailReducers';
import effects from './effects';
import { sendMail } from './actions';
import { actions } from '../../store/reducers';
import { URL, CHART } from '../../constants';

class LandingPage extends Component {
  static propTypes = {
    chartData: object,
    roomConfig: object,
    temperatureObj: object,
    setChartData: func.isRequired,
    setRoomConfig: func.isRequired,
    setTempObj: func.isRequired,
    history: object.isRequired,
    dispatchSendMail: func.isRequired,
  }

  static defaultProps = {
    chartData: null,
    roomConfig: null,
    temperatureObj: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { chartData, roomConfig, temperatureObj } = nextProps;
    if ((!chartData && roomConfig && temperatureObj) ||
      (chartData && this.props.temperatureObj.length !== temperatureObj.length)) {
      const chartDataPlot = {};
      const chartDataSet = {};
      map(roomConfig, (rooms, month) => {
        map(rooms, (room, roomNo) => {
          chartDataSet[roomNo] = { ...chartDataSet[roomNo] };
          map(temperatureObj[month], (avgTempOfDay, date) => {
            chartDataSet[roomNo].Predict = { ...chartDataSet[roomNo].Predict };
            chartDataSet[roomNo].Predict[month] = { ...chartDataSet[roomNo].Predict[month] };
            chartDataSet[roomNo].Predict[month][date] = { ...chartDataSet[roomNo].Predict[month][date] };
            chartDataSet[roomNo].Actual = { ...chartDataSet[roomNo].Actual };
            chartDataSet[roomNo].Actual[month] = { ...chartDataSet[roomNo].Actual[month] };
            chartDataSet[roomNo].Actual[month][date] = { ...chartDataSet[roomNo].Actual[month][date] };
            if (!Array.isArray(avgTempOfDay)) {
              chartDataSet[roomNo].Actual[month][date] = avgTempOfDay;
              chartDataSet[roomNo].Predict[month][date] = avgTempOfDay + room.ek + (room.bk * avgTempOfDay);
            } else {
              chartDataSet[roomNo].Actual[month][date] = 0;
              chartDataSet[roomNo].Predict[month][date] = 0;
            }
          });
        });
      });
      map(chartDataSet, (dual, room) => {
        chartDataPlot[room] = { Actual: [], Predict: [] };
        map(dual.Actual, (val) => {
          map(val, (temp) => {
            chartDataPlot[room].Actual.push(temp);
          });
        });
        map(dual.Predict, (val) => {
          map(val, (temp) => {
            chartDataPlot[room].Predict.push(temp);
          });
        });
      });
      this.props.setChartData(chartDataPlot);
    }
  }

  onConfigHandle = (rawData) => {
    const content = slice(rawData, 1, rawData.length);
    const roomConfig = {};
    map(content, (record) => {
      const [month, room, bk, ek] = record;
      if (month) {
        roomConfig[`${month - 1}`] = { ...roomConfig[`${month - 1}`] };
        roomConfig[`${month - 1}`][`${room}`] = { bk: Number(bk), ek: Number(ek) };
      }
      return {
        month, room, bk, ek,
      };
    });
    this.props.setRoomConfig(roomConfig);
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
      if (month !== undefined && day) {
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
    this.props.setTempObj(temperatureObj);
  }

  onOpenMail = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        email: true,
      };
    });
  }

  onSendMail = (values) => {
    const { dispatchSendMail } = this.props;
    console.log('avalues', values);
    dispatchSendMail(values);
    this.emailSent();
  }

  onLogOut = () => {
    this.props.history.push(URL.HOME);
  }

  emailSent = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        email: false,
      };
    });
  }

  render() {
    const { chartData } = this.props;
    const collections = map(chartData, (data) => {
      return {
        labels: range(0, data.Actual.length),
        datasets: [
          {
            ...CHART.ACTUAL,
            data: data.Actual,
          },
          {
            ...CHART.PREDICT,
            data: data.Predict,
          },
        ],
      };
    });

    return (
      <div>
        <Email isOpen={this.state.email} onClose={this.emailSent} onSend={this.onSendMail} />
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">SimedTrieste</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem>
              <Button onClick={this.onLogOut}>Log out</Button>
            </NavItem>
            <NavItem>
              <Button onClick={this.onOpenMail}>Send email</Button>
            </NavItem>
          </Nav>
        </Navbar>
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
        {
          map(collections, (data, room) => {
            const uid = uuid();
            return (
              <Col key={uid} smOffset={2} sm={8} className={Styles.chart}>
                <Panel>
                  <Panel.Heading>ROOM {room + 1}</Panel.Heading>
                  <Panel.Body>
                    <Line data={data} />
                  </Panel.Body>
                </Panel>
              </Col>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartData: state.chartReducers.get('chartData'),
    roomConfig: state.chartReducers.get('roomConfig'),
    temperatureObj: state.chartReducers.get('temperatureObj'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChartData: (data) => {
      dispatch(actions.setChartData(data));
    },
    setRoomConfig: (config) => {
      dispatch(actions.setRoomConfig(config));
    },
    setTempObj: (obj) => {
      dispatch(actions.setTempObj(obj));
    },
    dispatchSendMail: (email) => {
      dispatch(sendMail.start(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage));
export { reducers, mailReducers, effects };
