import React from 'react';
import { Menu,Icon } from 'antd';

const leftMenu = (props)=>{
    const {collapsed,menuWidth} = props.state
    return (
        <div id="menu" style={{width:menuWidth}}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                onClick={props.checkMenu}
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
            </Menu>
        </div>
    )
}

export default leftMenu