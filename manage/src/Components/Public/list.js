import React, { Fragment } from "react";
import { Button } from "antd";

import {
  setCurrentId,
  setCurrentType,
  setWriteBoo
} from "store/actionCreators";
import { connect } from "react-redux";

const list = props => {
  const { list, current } = props;
  const divlist = list.map((item, index) => {
    return (
      <div className="oneArticle" key={index}>
        <h2
          className="title fl"
          onClick={() => props.setCurrentId(item.articalid, current)}
        >
          <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
          <div className="underline"></div>
        </h2>
        <div className="clear"></div>
        {item.summary !== undefined ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Fragment>
            <p className="fr grey">{item.time}</p>
            <p className="clear"></p>
          </Fragment>
        )}
      </div>
    );
  });
  return (
    <div id="ArticalList">
      <Button
        className="fr mb10"
        onClick={() => props.setCurrentId(null, current)}
      >
        新增
      </Button>
      <div className="clear"></div>
      {divlist}
    </div>
  );
};

const dispatchToProps = dispatch => {
  return {
    setCurrentId(id, type) {
      const idAction = setCurrentId(id);
      dispatch(idAction);
      const typeAction = setCurrentType(type);
      dispatch(typeAction);
      const writeBoo = setWriteBoo(true);
      dispatch(writeBoo);
    }
  };
};

export default connect(
  null,
  dispatchToProps
)(list);
