import React, { Component,Fragment } from 'react';
import Loading from '../Public/loading'
import Common from './common'
import Write from './Write/write'
import List from './ArticalList/articalList'
import Visitor from './Visitor/visitor'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightWidth:"calc(100% - 242px)",
            rightLeft:"242px",
            username:"阿鱼",
            articalId:"",
            isList:true,
            loading:false,
            currentComponent:"2"
        }
    }

    componentDidMount(){
      window.router = this.props.history;
    }

    changeWidth(boo){
      if(!boo){
        this.setState({
          rightWidth:"calc(100% - 242px)",
          rightLeft:"242px"
        })
      }else{
        this.setState({
          rightWidth:"calc(100% - 80px)",
          rightLeft:"80px"
        })
      }
      
    }

    getArticalId(id){
      this.setState({
        articalId:id,
        isList:false
      })
    }

    loading(boo){
      this.setState({
        loading:boo
      })
    }

    add(){
      this.setState({
        isList:false
      })
    }

    cancel(){
      this.setState({
        isList:true
      })
    }

    checkMenu(item){
      this.setState({
        currentComponent:item.key
      })
    }

    render() { 
        const {rightWidth,rightLeft,username,isList,articalId,loading,currentComponent} = this.state
        let rightMain = null
        switch(currentComponent){
          case "1":
            if(isList){
              rightMain = <List 
                            getArticalId={this.getArticalId.bind(this)}
                            add={this.add.bind(this)}
                            loading={this.loading.bind(this)}
                          />
              break;
            }else{
              rightMain = <Write 
                            username={username}
                            articalId={articalId}
                            cancel={this.cancel.bind(this)}
                            loading={this.loading.bind(this)}
                          />
              break;
            }
          case "2":
            rightMain = <Visitor 
                          loading={this.loading.bind(this)}
                        />
            break;
          default:
            break;
        }
        return ( 
            <Fragment>
                <Common 
                  changeWidth={this.changeWidth.bind(this)}
                  checkMenu={this.checkMenu.bind(this)}
                />
                <div id="rightMain" style={{width:rightWidth,left:rightLeft}}>
                    {rightMain}
                </div>
                {
                  loading?<Loading />:null
                }
            </Fragment>
         );
    }
} 
 
export default Index;