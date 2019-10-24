import React, { Component,Fragment } from 'react';
import Header from './header'
import Menu from './menu'
import Write from './Write/write'
import List from './articalList/articalList'
import Loading from '../Public/loading'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed:false,
            opacity:1,
            menuLeft:"260px",
            menuWidth:"242px",
            rightWidth:"calc(100% - 242px)",
            rightLeft:"242px",
            username:"阿鱼",
            articalId:"",
            isList:true,
            loading:false
        }
    }

    componentDidMount(){
      window.router = this.props.history;
    }

    toggleCollapsed(){
        this.setState({
          collapsed: !this.state.collapsed,
        },()=>{
            if(this.state.collapsed){
                this.setState({
                    opacity:0,
                    menuLeft:"90px",
                    menuWidth:"80px",
                    rightWidth:"calc(100% - 80px)",
                    rightLeft:"80px"
                })
            }else{
                this.setState({
                    opacity:1,
                    menuLeft:"260px",
                    menuWidth:"242px",
                    rightWidth:"calc(100% - 242px)",
                    rightLeft:"242px"
                })
            }
        })
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

    render() { 
        const {rightWidth,rightLeft,username,isList,articalId,loading} = this.state
        return ( 
            <Fragment>
                <Header 
                    state={this.state}
                    toggleCollapsed={this.toggleCollapsed.bind(this)}
                />
                <Menu 
                    state={this.state}
                />
                <div id="rightMain" style={{width:rightWidth,left:rightLeft}}>
                    {
                      isList?
                      <List 
                        getArticalId={this.getArticalId.bind(this)}
                        add={this.add.bind(this)}
                        loading={this.loading.bind(this)}
                      />:
                      <Write 
                        username={username} 
                        articalId={articalId}
                        cancel={this.cancel.bind(this)}
                        loading={this.loading.bind(this)}
                      />
                    }
                </div>
                {
                  loading?<Loading />:null
                }
            </Fragment>
         );
    }
} 
 
export default Index;