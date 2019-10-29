import React, {
  Component,
  Fragment
} from 'react';
import LifeListUi from 'Components/Public/list';
import IPserver from 'IPserver';
import {
  get
} from 'Common/axios.js'
import {
  message
} from 'antd'

class LifeList extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }

  componentDidMount(){
    this.props.loading(true)
    get(IPserver + "journals/getJournal.php").then((res)=>{
      if(res.length !== 0){
        this.setState({
          list:res
        })
      }
      this.props.loading(false)
    }).catch(()=>{
      message.error("请求失败")
      this.props.loading(false)
    })
  }

  render(){
    return(
      <Fragment>
        <LifeListUi 
          add={this.props.add.bind(this)}
          toWrite={this.props.getLifeArticalId}
          state={this.state}
          />
      </Fragment>
    )
  }
}

export default LifeList;