import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Badge, Card, CardBody, CardHeader, Flex, Link, Grid, Heading, Text, Box, Button, useDisclosure, Code, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useRef } from "react";
import { Link as RouterLink } from 'react-router-dom';

import { Loading } from "../components";
import { useAppsQuery } from "../graphql";

export function Apps() {
  const clusterIpAddress = location.hostname;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useAppsQuery({ showHidden: false, clusterIpAddress });
  const initialRef = useRef(null);
  const finalRef = useRef(null)

  if (isLoading) return <Loading />

  return (
    <Flex direction="column">
      <Button colorScheme='purple' alignSelf="end" onClick={onOpen}>New application</Button>
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
                  <Badge colorScheme={`${app.status === 'RUNNING' ? 'green' : 'red'}`}>{app.status}</Badge>
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deploy application</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex >
  )
}