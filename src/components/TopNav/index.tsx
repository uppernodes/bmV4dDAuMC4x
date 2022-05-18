import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext } from "react";
import { BiListPlus, BiLogOut, BiUserPlus } from "react-icons/bi";
import {
  RiMenu2Line,
  RiMenuLine,
  RiNotification2Line,
  RiSearch2Line,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

export default function TopNav() {
  const { user, signOut } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Flex
      zIndex="1000"
      position="fixed"
      style={{ width: "100vw" }}
      align="center"
      mx="auto"
      bg="#eee"
      p="4"
      justify="space-between"
      flexDir="row"
    >
      <Flex flexDir="row" align="center">
        <Link href={user && user._id ? "/dashboard" : "/"}>
          <Flex cursor="pointer" flexDir="row">
            <Image
              src="https://e865-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
            <Flex flexDir="column">
              <Text fontSize="2xl" fontWeight="bold" color="#333">
                uppernodes
              </Text>
            </Flex>
          </Flex>
        </Link>
      </Flex>
      <Flex flexDir="row" align="center">
        <Menu>
          <MenuButton>
            <Flex
              boxShadow="rgba(0,0,0, 0.05) 0 0 10px"
              bg="#eee"
              borderRadius="5"
              align="center"
              justify="center"
              p="2"
            >
              <Icon as={RiMenu2Line} color="#333" fontSize="18" />
              <Avatar
                name="Ricardo Domene"
                fontFamily="sans-serif"
                bg="#333"
                size="sm"
                ml="3"
              />
            </Flex>
          </MenuButton>
          <MenuList
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            mt="1"
            zIndex="3"
            bg="#fff"
            border="1px solid #e0e0e0"
            py="0"
          >
            <MenuItem
              _focus={{
                borderRadius: 5,
                backgroundColor: "#eee",
              }}
              _hover={{
                borderRadius: 5,
                backgroundColor: "#eee",
              }}
              justifyContent="space-between"
              py="4"
              onClick={() => {
                onOpen();
              }}
              color="#333"
              fontSize="sm"
            >
              {user && user.name}
            </MenuItem>
            <MenuItem
              _hover={{
                borderRadius: 5,
                backgroundColor: "#eee",
              }}
              justifyContent="space-between"
              py="4"
              onClick={() => {
                signOut();
              }}
              color="#333"
              fontSize="sm"
            >
              Sair da sua conta
              <Icon as={BiLogOut} fontSize="md" color="#facebook.400" />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
