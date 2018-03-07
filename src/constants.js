import keyMirror from 'key-mirror';
import { map, range } from 'lodash';

export const URL = {
  HOME: '/',
  LANDING: '/landingpage',
  HOST: 'http://simed7-trieste.7e14.starter-us-west-2.openshiftapps.com/spring-mvc-angularjs/api/',
  // HOST: 'http://localhost:9090/api/',
  USERS: 'user',
  MAIL: 'sendMail',
};

export const ACTION_REQ = keyMirror({
  START: null,
  SUCCESS: null,
  ERROR: null,
});

export const AUTH = keyMirror({
  SIGN_UP: null,
  LOGIN: null,
});

export const DAYS = map(range(1, 16), (d) => {
  return `${d}`;
});

export const ROOMS = range(1, 5);

export const ACTION = keyMirror({
  SET_ROOM_CONFIG: null,
  SET_TEMP_OBJ: null,
  SET_CHART_DATA: null,
  SEND_MAIL: null,
});

export const CHART = {
  BLUE: 'rgba(49,99,188,1)',
  RED: 'rgba(261,86,65,1)',
  OPTION: {
    fill: false,
    fillColor: 'rgba(0,100,62,0.83)',
    lineTension: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
  },
  get ACTUAL() {
    return {
      label: 'Actual',
      borderColor: this.BLUE,
      pointBorderColor: this.BLUE,
      pointHoverBackgroundColor: this.BLUE,
      pointHoverBorderColor: this.BLUE,
      ...this.OPTION,
    };
  },
  get PREDICT() {
    return {
      label: 'Predict',
      borderColor: this.RED,
      pointBorderColor: this.RED,
      pointHoverBackgroundColor: this.RED,
      pointHoverBorderColor: this.RED,
      ...this.OPTION,
    };
  },
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};
