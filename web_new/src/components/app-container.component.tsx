import { Layout, theme } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar.component";

export function AppContainer() {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Vira Paas ©2023 Created by Vira</Footer>
      </Layout>
    </Layout>
  )
}