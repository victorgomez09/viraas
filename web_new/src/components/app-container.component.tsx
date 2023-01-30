import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from ".";

export function AppContainer() {
  return (
    <Flex width={"100%"} height={"100vh"} direction="column">
      <Navbar />
      <Box flex={1} p={4}>
        <Outlet />
      </Box>
    </Flex>
  )
}