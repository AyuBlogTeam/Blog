import React from 'react';
import { Icon } from 'antd';

const Header = (props)=>{
    const {collapsed,opacity,menuLeft,menuWidth} = props.state
    return (
        <div id="header">
            <div className="siteName" style={{opacity:opacity,width:menuWidth}}>阿鱼的研发日志</div>
                <Icon style={{left:menuLeft}} className="collapsedIcon" onClick={props.toggleCollapsed} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            <div className="count">欢迎您，阿鱼</div>
        </div>
    )
}
 
export default Header;