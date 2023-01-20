import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "../types";
import { getItem } from "../utils/antd.util";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(<Link to="/apps">Applications</Link>, "apps", <PieChartOutlined />),
    getItem("Plugins", "plug", <DesktopOutlined />),
    getItem(<Link to="/nodes">Nodes</Link>, "nodes", <ClusterOutlined />),
    getItem("User", "user", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
  ];

  const { pathname } = useLocation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: colorBgBase, fontSize: "1.2em" }}>Viraas</span>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        selectedKeys={[pathname.replace(/^\/|\/$/g, "")]}
      />
    </Sider>
  );
}

// export default Sidebar;
