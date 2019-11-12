import React from "react";
import { Button } from "antd";

import { setCurrentId, setCurrentType, setWriteBoo } from "./store/store";

const list = props => {
  const { list, current, dispatch } = props;
  const divlist = list.map((item, index) => {
    return (
      <div className="oneArticle" key={index}>
        <h2
          className="title fl"
          onClick={() => {
            dispatch(setCurrentId(item.articalid));
            dispatch(setCurrentType(current));
            dispatch(setWriteBoo(true));
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
          <div className="underline"></div>
        </h2>
        <div className="clear"></div>
        {item.summary !== undefined ? (
          <React.Fragment>
            <div className="richContent">
              <div className="pic">
                <img alt="" src={item.coverimg} />
              </div>
              <div className="info">
                <p>{item.summary}</p>
              </div>
            </div>
            <div className="footArticle">
              {item.kind !== undefined ? (
                <p className="fl grey">{item.kind}</p>
              ) : null}
              <p className="fr grey">{item.time}</p>
              <p className="clear"></p>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="fr grey">{item.time}</p>
            <p className="clear"></p>
          </React.Fragment>
        )}
      </div>
    );
  });
  return (
    <div id="ArticalList">
      <Button
        className="fr mb10"
        onClick={() => {
          dispatch(setCurrentId(null));
          dispatch(setCurrentType(current));
          dispatch(setWriteBoo(true));
        }}
      >
        新增
      </Button>
      <div className="clear"></div>
      {divlist}
    </div>
  );
};

export default list;
