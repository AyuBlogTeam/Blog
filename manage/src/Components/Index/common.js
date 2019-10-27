import React, { Component,Fragment } from 'react';
import { Menu,Icon } from 'antd';

class Common extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed:false,
            opacity:1,
            menuLeft:"260px",
            menuWidth:"242px",
         }
    }

    toggleCollapsed(){
        this.setState({
          collapsed: !this.state.collapsed,
        },()=>{
            this.props.changeWidth(this.state.collapsed)
            if(this.state.collapsed){
                this.setState({
                    opacity:0,
                    menuLeft:"90px",
                    menuWidth:"80px",
                })
            }else{
                this.setState({
                    opacity:1,
                    menuLeft:"260px",
                    menuWidth:"242px",
                })
            }
        })
    }

    render() { 
        const {collapsed,opacity,menuLeft,menuWidth} = this.state 
        return ( 
            <Fragment>
                <div id="header">
                    <div className="siteName" style={{opacity:opacity,width:menuWidth}}>阿鱼的研发日志</div>
                        <Icon style={{left:menuLeft}} className="collapsedIcon" onClick={this.toggleCollapsed.bind(this)} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                    <div className="count">欢迎您，阿鱼</div>
                </div>
                <div id="menu" style={{width:menuWidth}}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                        onClick={this.props.checkMenu}
                        inlineCollapsed={collapsed}
                    >
                        <Menu.Item key="1">
                            <Icon type="reddit" />
                            <span>日志</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="frown" />
                            <span>访客</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="yuque" />
                            <span>看板娘</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Fragment>
         );
    }
}
 
export default Common;
