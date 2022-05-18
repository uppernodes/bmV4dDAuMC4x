import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { RiCloseFill, RiUserLine } from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";

export default function Header() {
  const { user, darkMode, setDarkMode } = useContext(Context);

  const [menu, setMenu] = useState(false);

  // LUMCuagNtbEyvS4 mdb
  // dimitrious mdb.user
  // rXK9z3eU9MZbhPRE mdb.password

  // ricardofsdomene@icloud.com
  // Azd202020

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  return (
    <>
      {menu && (
        <Flex
          zIndex="2"
          position="absolute"
          h="calc(100vh - 80px)"
          style={{ marginTop: 80 }}
          w="100vw"
          boxShadow="rgba(159,159,159,0.1) 0 0 10px"
          bg="#FFF"
        ></Flex>
      )}
      <Flex
        align="center"
        p="4"
        bg={darkMode ? "#333" : "#eee"}
        w="100vw"
        style={{ height: 80 }}
      >
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          mx="auto"
          maxW={1000}
        >
          <Flex align="center">
            <Image
              src="https://d1e4-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
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
          <Flex align="center">
            <Menu>
              <MenuButton
                borderRadius="full"
                p="2"
                _hover={{
                  height: 40,
                  width: 40,
                  backgroundColor: darkMode ? "#555" : "#e0e0e0",
                }}
                style={{
                  height: 40,
                  width: 40,
                }}
                ml="5"
              >
                <Icon
                  mt="1"
                  as={RiUserLine}
                  cursor="pointer"
                  color={darkMode ? "#EEE" : "#333"}
                  fontSize="20"
                />
              </MenuButton>
              <MenuList bg="#f0f0f0" border="0px solid transparent" py="0">
                <MenuItem
                  _hover={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: 5,
                  }}
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    setDarkMode(false);
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Modo escuro
                  <Icon as={MdDarkMode} color="#333" />
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: 5,
                  }}
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {}}
                  color="#333"
                  fontSize="sm"
                >
                  Quero vender meu curso
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: 5,
                  }}
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {}}
                  color="#333"
                  fontSize="sm"
                >
                  Quero vender meu ebook
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: 5,
                  }}
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {}}
                  color="#333"
                  fontSize="sm"
                >
                  Quero criar paginas de vendas
                </MenuItem>
              </MenuList>
            </Menu>
            <Link href="/auth/signup">
              <Flex
                cursor="pointer"
                bg="#F00066"
                px="4"
                py="2"
                ml="4"
                borderRadius="5"
                justify="center"
                align="center"
              >
                <Text color="#FFF" fontSize="14" fontWeight="bold">
                  {user && user._id ? "Dashboard" : "Entrar"}
                </Text>
              </Flex>
            </Link>
            {/* <Flex
              onClick={() => setMenu(!menu)}
              justify="center"
              align="center"
              flexDir="column"
              ml="4"
            >
              {menu ? (
                <Icon as={RiCloseFill} color="#000" fontSize="20" />
              ) : (
                <>
                  <div
                    style={{ height: 2, width: 20, backgroundColor: "#000" }}
                  />
                  <div
                    style={{
                      height: 2,
                      width: 20,
                      marginTop: 5,
                      backgroundColor: "#000",
                    }}
                  />
                </>
              )}
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
