import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  VStack,
  Badge,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Grid,
  Drawer,
  useDisclosure,
  CloseButton,
  DrawerContent,
  Avatar,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { Loading } from "../components";
import {
  useAppDetailsQuery,
  useAppLogsQuery,
  useAppLogsSubscription,
  useNodeDetailsQuery,
} from "../graphql";
import { checkAppStatus } from "../utils";

export function AppDetails() {
  const { id } = useParams();
  const { data, loading, error } = useAppDetailsQuery(id || "");
  const { data: logsData } = useAppLogsSubscription(id || "");

  // if (loading) return <Loading />;

  if (logsData) console.log("logsData", logsData.logs.logs);

  console.log("data", data);

  return (
    <Tabs
      display={"grid"}
      as={Grid}
      templateColumns="12em 1fr"
      width={"100%"}
      height={"100%"}
      orientation="vertical"
      variant="soft-rounded"
      colorScheme="purple"
      gap={4}
    >
      <Stack height={"100%"} width={"100%"} spacing={8} mx={"auto"}>
        <Flex
          height={"100%"}
          width={"100%"}
          rounded={"lg"}
          bg={useColorModeValue("gray.200", "gray.700")}
          boxShadow={"lg"}
          p={2}
          direction={"column"}
        >
          <TabList gap={2}>
            <Tab rounded={"lg"}>General</Tab>
            <Tab rounded={"lg"}>Logs</Tab>
          </TabList>
        </Flex>
      </Stack>

      <TabPanels>
        <TabPanel height={"100%"} width={"100%"} padding={0}>
          <Box
            height={"100%"}
            width={"100%"}
            rounded={"lg"}
            bg={useColorModeValue("gray.200", "gray.700")}
            boxShadow={"lg"}
            p={2}
          >
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {data?.app.name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  {data?.app.id}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        URL:
                      </Text>{" "}
                      {data?.app.availableAt}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Status:
                      </Text>{" "}
                      <Badge
                        colorScheme={
                          checkAppStatus(
                            data?.app.status || "STOPPED",
                            data?.app.instances?.running || 0
                          ).statusColor
                        }
                      >
                        {checkAppStatus(
                          data?.app.status || "STOPPED",
                          data?.app.instances?.running || 0
                        ).statusValue.toUpperCase()}
                      </Badge>
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Instances:
                      </Text>{" "}
                      {data?.app.instances?.running}/
                      {data?.app.instances?.total}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Target ports:
                      </Text>{" "}
                      {data?.app.targetPorts}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Publisehd ports:
                      </Text>{" "}
                      {data?.app.publishedPorts}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Volumes:
                      </Text>{" "}
                      {data?.app.volume}
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        ENV:
                      </Text>{" "}
                      {JSON.stringify(data?.app.env)}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </TabPanel>

        <TabPanel height={"100%"} padding={0}>
          <Box
            height={"100%"}
            width={"100%"}
            rounded={"lg"}
            bg={useColorModeValue("gray.200", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            {/* <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue={logsData?.logs.join("\n").trim()}
            /> */}
          </Box>
        </TabPanel>
      </TabPanels>
      {/* {loading && <Loading />} */}
    </Tabs>
  );
}
