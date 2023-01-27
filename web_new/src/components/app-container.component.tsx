import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from ".";

export function AppContainer() {
  return (
    <Flex direction="column">
      <Navbar />
      <Box p={4}>
        <Outlet />
      </Box>
    </Flex>
  )
}