import { fromJS } from 'immutable';
import { ACTION } from '../../constants';

const initState = fromJS({
  chartData: null,
  roomConfig: null,
  temperatureObj: null,
  fileLength: 0,
});

const chartReducers = (state = initState, action) => {
  switch (action.type) {
  case ACTION.SET_ROOM_CONFIG:
    return state.set('roomConfig', action.payload);
  case ACTION.SET_TEMP_OBJ:
    return state
      .set('fileLength', action.payload.len)
      .set('temperatureObj', action.payload.tempObj);
  case ACTION.SET_CHART_DATA:
    return state.set('chartData', action.payload);
  default: return state;
  }
};

export default { chartReducers };
