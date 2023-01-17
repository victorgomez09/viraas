import { MailOutlined, AppstoreOutlined, SettingOutlined, FileZipOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="/apps">
          Applications
        </Link>
      ),
      key: 'apps',
      icon: < AppstoreOutlined />,
    },
    {
      label: (
        <Link to="/plugins">
          Plugins
        </Link>
      ),
      key: 'plugins',
      icon: <FileZipOutlined />,
    },
    {
      label: (
        <Link to="/nodes">
          Nodes
        </Link>
      ),
      key: 'nodes',
      icon: <DatabaseOutlined />,
    },
    {
      label: 'User',
      key: 'user',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
      style: { 'marginLeft': 'auto' },
      disabled: true
    },
  ];

  const [current, setCurrent] = useState('apps');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '100%' }} />;
}

export default Navbar