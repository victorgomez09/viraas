import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components";
import { useHealthQuery } from "../graphql";

export function PrivateRoute() {
  const openNotification = () => {};

  // load user from provider
  const { data, isError, isLoading } = useHealthQuery();

  if (isLoading)
    return (
      <Box style={{ minHeight: "100vh" }}>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          style={{
            margin: "16px 16px",
          }}
        >
          <Loading />
        </Flex>
      </Box>
    );

  if (isError) {
    openNotification();
    return <Navigate to="/login" />;
  }

  return data?.health ? <Outlet /> : <Navigate to="/login" />;
}
