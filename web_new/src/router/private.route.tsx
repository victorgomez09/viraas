import { Layout, notification, Space, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components";
import { useHealthQuery } from '../graphql'

export function PrivateRoute() {

  const openNotification = () => {
    notification.open({
      message: 'Something goes wrong',
      description:
        'Something goes wrong, we redirect you to the login',
    });
  };

  // load user from provider
  const { data, isError, isLoading } = useHealthQuery();

  if (isLoading) return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loading />
        </Content>
      </Layout>
    </Layout>
  )

  if (isError) {
    openNotification()
    return <Navigate to="/login" />
  }

  return data?.health ? <Outlet /> : <Navigate to="/login" />;
}