import { Box, Flex, Heading, List, ListItem, SimpleGrid, Stack, StackDivider, useColorModeValue, Text, VStack, Badge, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Loading } from "../components";
import { useNodeDetailsQuery } from "../graphql";

export function NodeDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useNodeDetailsQuery(id || "");

  if (isLoading) return <Loading />

  return (
    <Flex direction="column">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18 }}>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {data?.node.hostname}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {data?.node.id}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    ID:
                  </Text>{' '}
                  {data?.node.id}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    IP:
                  </Text>{' '}
                  {data?.node.ip}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Operative System:
                  </Text>{' '}
                  {data?.node.os.toUpperCase()}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Architecture:
                  </Text>{' '}
                  {data?.node.architecture}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Status:
                  </Text>{' '}
                  <Badge colorScheme={`${data?.node.status === 'ready' ? 'green' : 'red'}`}>{data?.node.status.toUpperCase()}</Badge>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Labels:
                  </Text>{' '}
                  {Object.entries(data?.node.labels || {}).length ? Object.entries(data?.node.labels!).map(([key, value]) => {
                    if (value) return `${key}=${value}`;
                    return key;
                  }) : <Text
                    as={'span'}
                    color={useColorModeValue('gray.500', 'gray.400')}
                  >
                    This node don't have labels
                  </Text>}
                </ListItem>

                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Applications:
                  </Text>{' '}
                  {data?.node.services.length ? <TableContainer>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Docker image</Th>
                          <Th>status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.node.services.map((service, index) => {
                          return (
                            <Tr key={index}>
                              <Th>{service.name}</Th>
                              <Th>{service.image}</Th>
                              <Th><Badge colorScheme={`${service.status.toLowerCase() === 'running' ? 'green' : 'red'}`}>{service.status.toUpperCase()}</Badge></Th>
                            </Tr>
                          )
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer> : <Text
                    as={'span'}
                    color={useColorModeValue('gray.500', 'gray.400')}
                  >
                    This node don't have applications running
                  </Text>}
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Flex>
  )
}