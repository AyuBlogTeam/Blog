import React ,{Fragment} from 'react';
import {
  Button
} from 'antd'

const list = (props)=>{
  const { list } = props.state
  const divlist = list.map((item,index)=>{
    return (
      <div className="oneArticle" key={index}>
        <h2 className="title fl" onClick={()=>props.toWrite(item.articalid)}>
          <div dangerouslySetInnerHTML={{__html:item.title}}></div>
          <div className="underline"></div>
        </h2>
        <div className="clear"></div>
        {
            item.summary !== undefined?
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
                    {
                        item.kind !== undefined?<p className="fl grey">{item.kind}</p>:null
                    }
                    <p className="fr grey">{item.time}</p>
                    <p className="clear"></p>
                </div>
            </Fragment>:
            <Fragment>
                <p className="fr grey">{item.time}</p>
                <p className="clear"></p>
            </Fragment>
        }
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

export default list;