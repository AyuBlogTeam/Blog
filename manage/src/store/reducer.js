import {
  SET_LIST,
  SET_LOADING,
  SET_CURRENTID,
  SET_CURRENT_TYPE,
  SET_WRITE_BOO
} from "./actionTypes";

const defaultState = {
  list: [],
  loading: false,
  currentId: null,
  currentType: null,
  writeBoo: false
};

export default (state = defaultState, action) => {
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
