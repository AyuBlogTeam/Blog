import React, { Component,Fragment } from 'react';
import Header from './header'
import Menu from './menu'
import Write from './Write/write'

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
            username:"阿鱼"
        }
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

    render() { 
        const {rightWidth,rightLeft,username} = this.state
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
                    <Write username={username} />
                </div>
            </Fragment>
         );
    }
}
 
export default Index;