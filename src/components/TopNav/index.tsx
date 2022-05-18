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
import { MdDarkMode } from "react-icons/md";
import {
  RiEditFill,
  RiMenu2Line,
  RiMenuLine,
  RiNotification2Line,
  RiSearch2Line,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";

export default function TopNav() {
  const { user, signOut, darkMode, setDarkMode } = useContext(Context);

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
      boxShadow="rgba(150,150,150,0.1) 0 0 10px"
      style={{ width: "100vw" }}
      align="center"
      mx="auto"
      bg={darkMode ? "#333" : "#eee"}
      p="4"
      justify="space-between"
      flexDir="row"
    >
      <Flex flexDir="row" align="center">
        <Link href={user && user._id ? "/dashboard" : "/"}>
          <Flex cursor="pointer" align="center" flexDir="row">
            <Image
              borderRadius="full"
              boxShadow="rgba(200,200,200,0.1) 0 0 10px"
              src="https://d1e4-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
            <Flex flexDir="column" align="flex-end"></Flex>
          </Flex>
        </Link>
        <Flex
          onClick={() => setDarkMode(!darkMode)}
          cursor="pointer"
          boxShadow="rgba(0,0,0,0.1) 0 0 10px"
          align="center"
          p="3"
          borderRadius="full"
          flexDir="row"
        >
          <Icon as={MdDarkMode} color={darkMode ? "#FFF" : "#333"} />
          <Flex flexDir="column" align="flex-end"></Flex>
        </Flex>
      </Flex>
      <Flex flexDir="row" align="center">
        <Menu>
          <MenuButton>
            <Avatar
              bg={"#333"}
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              src={user ? user.avatar : "https://github.com/0xrfsd.png"}
              name={user ? user.name : "Anonimo"}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </MenuButton>

          <MenuList
            style={{
              width: 200,
            }}
            boxShadow="rgba(0,0,0,0.2) 0 0 10px"
            mt="1"
            bg={darkMode ? "#555" : "#FFF"}
            borderRadius="5"
            justifyContent="space-between"
            zIndex="3"
            border="0px solid #e0e0e0"
            py="0"
          >
            <Flex
              flexDir="column"
              justify="center"
              align="center"
              borderBottom={darkMode ? "1px solid #666" : "1px solid #f0f0f0"}
            >
              <Flex flexDir="column" p="6" justify="center" align="center">
                <Avatar
                  name={user ? user.name : "Anonimo"}
                  color={darkMode ? "#333" : "#FFF"}
                  size="lg"
                  bg={darkMode ? "#FFF" : "#333"}
                  src={user ? user.avatar : "https://github.com/0xrfsd.png"}
                />
                <Text
                  mt="4"
                  color={darkMode ? "#FFF" : "#333"}
                  fontFamily="Quicksand"
                  fontWeight="semibold"
                  fontSize={isWideVersion ? "xl" : "md"}
                >
                  {user &&
                    user.name.split(" ")[0] +
                      " " +
                      user.name.split(" ")[user.name.split(" ").length - 1]}
                </Text>
              </Flex>
            </Flex>

            <Flex flexDir="column">
              <MenuItem
                _focus={{
                }}
                _hover={{
                  backgroundColor: "#eee",
                  color: darkMode ? "#333" : "#000"
                }}
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color={darkMode ? "#FFF" : "#555"}
                fontSize="sm"
              >
                {user && user.name}
              </MenuItem>
              <MenuItem
                _hover={{
                  backgroundColor: "#eee",
                  color: darkMode ? "#333" : "#000"
                }}
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  signOut();
                }}
                color={darkMode ? "#FFF" : "#333"}
                fontSize="sm"
              >
                Sair da sua conta
                <Icon as={BiLogOut} fontSize="md" color="#facebook.400" />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
