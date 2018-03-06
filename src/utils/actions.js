const createAction = (type, ...argNames) => {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
    return action;
  };
};

const createRequestActions = (ACTION_REQ) => {
  return {
    start: createAction(ACTION_REQ.START, 'payload'),
    success: createAction(ACTION_REQ.SUCCESS, 'payload'),
    error: createAction(ACTION_REQ.ERROR, 'payload'),
    canceled: createAction(ACTION_REQ.CANCELED, 'payload'),
  };
};

export default createRequestActions;
export {
  createRequestActions,
  createAction,
};
