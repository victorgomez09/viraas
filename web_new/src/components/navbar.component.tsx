import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom'

interface NavProps {
  name: string
  to: string
}

const links: NavProps[] = [
  {
    name: 'Applications',
    to: 'apps'
  },
  {
    name: 'Plugins',
    to: 'plugins'
  },
  {
    name: 'Services',
    to: 'services'
  },
  {
    name: 'Nodes',
    to: 'nodes'
  }
];

const NavLink = (navLink: NavProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={RouterLink}
    to={navLink.to}
    _activeLink={{ color: useColorModeValue('purple.700', 'purple.400'), borderBottom: "2px solid", borderColor: useColorModeValue('purple.700', 'purple.400') }}>
    {navLink.name}
  </Link>
);

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box as={RouterLink} to="/">Viraas</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {links.map((link, index) => (
              <NavLink key={index} name={link.name} to={link.to} />
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={'center'} gap={2}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link, index) => (
              <NavLink key={index} name={link.name} to={link.to} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}