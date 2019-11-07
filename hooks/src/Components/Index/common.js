import React, { useState, useEffect } from "react";
import { Menu, Icon } from "antd";

const Common = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [menuLeft, setMenuLeft] = useState("260px");
  const [menuWidth, setMenuWidth] = useState("242px");

  useEffect(() => {
    props.changeWidth(collapsed);
    if (collapsed) {
      setOpacity(0);
      setMenuLeft("90px");
      setMenuWidth("80px");
    } else {
      setOpacity(1);
      setMenuLeft("260px");
      setMenuWidth("242px");
    }
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div id="header">
        <div
          className="siteName"
          style={{ opacity: opacity, width: menuWidth }}
        >
          阿鱼的研发日志
        </div>
        <Icon
          style={{ left: menuLeft }}
          className="collapsedIcon"
          onClick={toggleCollapsed}
          type={collapsed ? "menu-unfold" : "menu-fold"}
        />
        <div className="count">欢迎您，阿鱼</div>
      </div>
      <div id="menu" style={{ width: menuWidth }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          onClick={props.checkMenu}
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1">
            <Icon type="reddit" />
            <span>随笔记</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="highlight" />
            <span>生活日志</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="rocket" />
            <span>记录</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="frown" />
            <span>访客</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="yuque" />
            <span>看板娘</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="deployment-unit" />
            <span>反馈</span>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
export default Common;
