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

export default function Header({ none }) {
  const { user, darkMode, setDarkMode, handleSetDarkMode } =
    useContext(Context);

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
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        p="4"
        bg={!none && darkMode ? "#333" : "#eee"}
        w="100vw"
        style={{ height: 80 }}
      >
        <Flex justify="space-between" align="center" w="100%">
          <Flex align="center">
            <Image
              borderRadius="full"
              src="https://b2f4-177-78-184-139.sa.ngrok.io/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
          </Flex>
          <Flex display={none ? "none" : null} align="center">
            <Link href={user && user._id ? "/admin" : "/auth/signup"}>
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
                  Painel de controle
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
