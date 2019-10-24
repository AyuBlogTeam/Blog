import React, {
  Component,
  Fragment
} from 'react';
import ArticalListUi from './articalListUi';
import IPserver from 'IPserver';
import {
  get
} from 'Common/axios.js'

class ArticalList extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }

  componentDidMount(){
    get(IPserver + "articals/getArtical.php").then((res)=>{
      if(res.length !== 0){
        this.setState({
          list:res
        })
      }
    })
  }
  
  render(){
    return(
      <Fragment >
        <ArticalListUi 
          state={this.state} 
          toWrite={this.props.getArticalId}
          add={this.props.add}
        />
      </Fragment>
    )
  }
}

export default ArticalList