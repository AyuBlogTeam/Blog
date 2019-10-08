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
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>写文章</span>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default leftMenu