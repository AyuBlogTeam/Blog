import React from 'react';
import {
  Button
} from 'antd'

const RecordListUi = (props)=>{
  const { list } = props.state
  const divlist = list.map((item,index)=>{
    return (
      <div className="oneArticle" key={index}>
        <h2 className="title fl" onClick={()=>props.toWrite(item.articalid)}>
          <div dangerouslySetInnerHTML={{__html:item.content}}></div>
          <div className="underline"></div>
        </h2>
        <div className="clear"></div>
        <p className="fr grey">{item.time}</p>
        <p className="clear"></p>
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

export default RecordListUi;