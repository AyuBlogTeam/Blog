import React, {
  Component,
  Fragment
} from 'react';
import RecordListUi from 'Components/Public/list';
import IPserver from 'IPserver';
import {
  get
} from 'Common/axios.js'
import {
  message
} from 'antd'

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.props.loading(true)
    get(IPserver + "records/getRecord.php").then((res) => {
      if (res.length !== 0) {
        let list = []
        res.map((item)=>{
          if (item.content.length >= 30) {
            item.title = item.content.substr(0, 30) + "...";
          } else {
            item.title = item.content;
          }
          list.push(item);
        })
        this.setState({
          list: list
        })
      }
      this.props.loading(false)
    }).catch((error) => {
      message.error("请求失败")
      this.props.loading(false)
    })
  }

  render() {
    return ( <
      Fragment >
      <
      RecordListUi add = {
        this.props.add.bind(this)
      }
      toWrite = {
        this.props.getRecordId
      }
      state = {
        this.state
      }
      /> <
      /Fragment>
    )
  }
}

export default RecordList;