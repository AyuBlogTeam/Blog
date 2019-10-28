import React from 'react';
import {
  Button
} from 'antd'

const LifeListUi = (props)=>{
  const { list } = props.state
  const divlist = list.map((item,index)=>{
    return (
      <div className="oneArticle" key={index}>
        <h2 className="title fl" onClick={()=>props.toWrite(item.articalid)}>
          {item.title}
          <div className="underline"></div>
        </h2>
        <div className="clear"></div>
        <div className="richContent">
          <div className="pic">
            <img alt="" src={item.coverimg} />
          </div>
          <div className="info">
            <p>{item.summary}</p>
          </div>
        </div>
        <div className="footArticle">
          <p className="fr grey">{item.time}</p>
          <p className="clear"></p>
        </div>
      </div>
    )
  })
  return (
    <div id="ArticalList">
      <Button className="fr mb10" onClick={props.add}>新增</Button>
      <div className="clear"></div>
      {divlist}
    </div>
  )
}

export default LifeListUi;