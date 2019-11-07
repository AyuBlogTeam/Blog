import React, { createContext, useReducer } from "react";

const defaultState = {
  list: [],
  loading: false,
  currentId: null,
  currentType: null,
  writeBoo: true
};

export const ReduxContext = createContext(defaultState);

export const SET_LIST = "setList";
export const SET_LOADING = "setLoading";
export const SET_CURRENTID = "setCurrentId";
export const SET_CURRENT_TYPE = "setCurrentType";
export const SET_WRITE_BOO = "setWriteBoo";

export const setList = value => ({
  type: SET_LIST,
  value
});

export const setLoading = value => ({
  type: SET_LOADING,
  value
});

export const setCurrentId = value => ({
  type: SET_CURRENTID,
  value
});

export const setCurrentType = value => ({
  type: SET_CURRENT_TYPE,
  value
});

export const setWriteBoo = value => ({
  type: SET_WRITE_BOO,
  value
});

export const reducer = (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_LIST:
      newState.list = action.value;
      break;
    case SET_LOADING:
      newState.loading = action.value;
      break;
    case SET_CURRENTID:
      newState.currentId = action.value;
      break;
    case SET_CURRENT_TYPE:
      newState.currentType = action.value;
      break;
    case SET_WRITE_BOO:
      newState.writeBoo = action.value;
      break;
    default:
      break;
  }
  return newState;
};

export const ReduxData = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <ReduxContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ReduxContext.Provider>
  );
};
