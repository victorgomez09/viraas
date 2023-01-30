import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Badge, Card, CardBody, CardHeader, Flex, Link, Grid, Heading, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

import { Loading } from "../components";
import { useAppsQuery } from "../graphql";
import { checkAppStatus } from "../utils";

export function Apps() {
  const clusterIpAddress = location.hostname;
  const { data, isLoading, isError } = useAppsQuery({ showHidden: false, clusterIpAddress });

  if (isLoading) return <Loading />

  console.log(data)

  return (
    <Flex direction="column">
      <Button colorScheme='purple' alignSelf="end" as={RouterLink} to="/apps/new">New application</Button>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {!data?.apps.length && <Text>This cluster don't have applications</Text>}
        {data?.apps.length && data.apps.map((app, index) => {
          return (
            <Card key={index} size="sm" minWidth="15em">
              <CardHeader as={RouterLink} to={`/apps/${app.id}`}>
                <Heading size='md'>{app.name}</Heading>
              </CardHeader>

              <CardBody>
                <Flex alignItems="center" justifyContent="space-between">
                  <Badge colorScheme={checkAppStatus(app.status, app.instances?.running || 0).statusColor}>{checkAppStatus(app.status, app.instances?.running || 0).statusValue}</Badge>
                  <Flex alignItems="center" gap={4}>
                    <Text fontSize='sm'>
                      {`${app.instances?.running}/${app.instances?.total}`}
                    </Text>
                    <Link href={app.availableAt[0]} isExternal>
                      <ExternalLinkIcon mx='2px' />
                    </Link>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
      </Grid>
    </Flex >
  )
}