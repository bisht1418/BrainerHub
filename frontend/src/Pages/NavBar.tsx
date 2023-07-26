import {
  Flex,
  Spacer,
  Box,
  Button,
  Heading,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import Theme from "../Components/Theme";
import { useColorMode } from "@chakra-ui/react";

const name = " < Neeraj />";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width={"100%"}
      id="nav-menu"
      position="sticky"
      top="0"
      zIndex="1"
      bg={colorMode === "light" ? "white" : "#1d2022"}
      color={colorMode === "light" ? "black" : "white"}
    >
      <Flex minWidth="max-content" p={5} alignItems="center" gap="0">
        <Box p="2">
          <Heading id="user-detail-name" size="md">
            {name}
          </Heading>
        </Box>
        <Spacer />
        <Box display={{ base: "none", md: "block", lg: "block" }}>
          <Flex alignItems="center" gap="10">
            <Box p="2">
              <Button colorScheme="black" variant="link">
                <NavLink to="/">Home</NavLink>
              </Button>
            </Box>
            <Box p="2">
              <Button colorScheme="black" variant="link">
                <NavLink to="/product">Product</NavLink>
              </Button>
            </Box>
            <Box p="2">
              <Button colorScheme="black" variant="link">
                <NavLink to="/login">Login</NavLink>
              </Button>
            </Box>
            <Box p="2">
              <Button colorScheme="black" variant="link">
                <NavLink className="nav-link projects" to="/register">
                  Register
                </NavLink>
              </Button>
            </Box>
            <Box>
              <Theme />
            </Box>
          </Flex>
        </Box>

        <Box display={{ base: "block", md: "none", lg: "none" }}>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            size="lg"
            onClick={onOpen}
            aria-label="Open menu drawer"
          />
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <Flex direction="column" alignItems="center" gap="5">
                  <Box p="2">
                    <Button colorScheme="teal" variant="link" onClick={onClose}>
                      <NavLink to="/">Home</NavLink>
                    </Button>
                  </Box>
                  <Box p="2">
                    <Button colorScheme="teal" variant="link" onClick={onClose}>
                      <NavLink to="/product">Product</NavLink>
                    </Button>
                  </Box>
                  <Box p="2">
                    <Button colorScheme="teal" variant="link" onClick={onClose}>
                      <NavLink to="/login">Login</NavLink>
                    </Button>
                  </Box>
                  <Box p="2">
                    <Button colorScheme="teal" variant="link" onClick={onClose}>
                      <NavLink to="/register">Register</NavLink>
                    </Button>
                  </Box>

                  <Box p="2">
                    <Theme />
                  </Box>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
