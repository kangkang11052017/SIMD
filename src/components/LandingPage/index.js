import React, { Component } from 'react';
import { object, func } from 'prop-types';
import CSVReader from 'react-csv-reader';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Table, Col, Button, Panel } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { head, slice, map, upperCase, range } from 'lodash';
import uuid from 'uuid';
import Styles from './LandingPage.css';
import reducers from './reducers';
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
  }

  static defaultProps = {
    chartData: null,
    roomConfig: null,
    temperatureObj: null,
  }

  componentWillReceiveProps(nextProps) {
    const { chartData, roomConfig, temperatureObj } = nextProps;
    if (!chartData && roomConfig && temperatureObj) {
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

    this.setState((prevState) => {
      return {
        ...prevState,
        table,
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
    this.props.setTempObj(temperatureObj);
    this.setState((prevState) => {
      return {
        ...prevState,
        temperatureObj,
      };
    });
  }

  getChartData = (state) => {
    const { roomConfig, temperatureObj } = state;
    const chartDataSet = {};
    const chartData = {};
    if (roomConfig && temperatureObj) {
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
        chartData[room] = { Actual: [], Predict: [] };
        // console.log('room', room);
        map(dual.Actual, (val) => {
          map(val, (temp) => {
            chartData[room].Actual.push(temp);
          });
        });
        map(dual.Predict, (val) => {
          map(val, (temp) => {
            chartData[room].Predict.push(temp);
          });
        });
      });
    }
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage));
export { reducers };
