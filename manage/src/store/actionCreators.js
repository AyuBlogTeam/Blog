import {
  SET_LIST,
  SET_LOADING,
  SET_CURRENTID,
  SET_CURRENT_TYPE,
  SET_WRITE_BOO
} from "./actionTypes";
import { get } from "Common/axios.js";
import IPserver from "IPserver";

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

export const getList = index => {
  return dispatch => {
    const action = setLoading(true);
    dispatch(action);
    let url = "";
    switch (index) {
      case "1":
        url = IPserver + "articals/getArtical.php";
        get(url)
          .then(res => {
            const action = setList(res);
            dispatch(action);
            const loading = setLoading(false);
            dispatch(loading);
          })
          .catch(() => {
            const loading = setLoading(false);
            dispatch(loading);
          });
        break;
      case "2":
        url = IPserver + "journals/getJournal.php";
        get(url)
          .then(res => {
            const action = setList(res);
            dispatch(action);
            const loading = setLoading(false);
            dispatch(loading);
          })
          .catch(() => {
            const loading = setLoading(false);
            dispatch(loading);
          });
        break;
      case "3":
        url = IPserver + "records/getRecord.php";
        get(url)
          .then(res => {
            if (res.length !== 0) {
              let list = [];
              res.map(item => {
                if (item.content.length >= 30) {
                  item.title = item.content.substr(0, 30) + "...";
                } else {
                  item.title = item.content;
                }
                list.push(item);
                return item;
              });
              const action = setList(res);
              dispatch(action);
            } else {
              const action = setList([]);
              dispatch(action);
            }
            const loading = setLoading(false);
            dispatch(loading);
          })
          .catch(() => {
            const loading = setLoading(false);
            dispatch(loading);
          });
        break;
      default:
        break;
    }
  };
};
