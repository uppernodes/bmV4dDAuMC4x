import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  RiAppleFill,
  RiAppleLine,
  RiGoogleFill,
  RiLock2Line,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

export default function Forgot() {
  const { user, signIn, signUp } = useContext(AuthContext);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const size = useWindowSize();

  const [email, setEmail] = useState("");

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  return (
    <Flex maxH={size.height} h="100vh" bg="#fafafa">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {user ? (
        <Flex justify="center" align="center" h="100vh" w="100vw">
          <Spinner size="xl" color="#42ba96" />
        </Flex>
      ) : (
        <Flex
          flexDir="column"
          py="4"
          justify="space-between"
          align="center"
          h="100vh"
          w="100vw"
        >
          <Flex align="center">
            <Image
              src="https://a174-2804-14c-3f89-8b76-e362-b2de-f80b-8737.sa.ngrok.io/images/inconformedia.png"
              w="45"
              h="45"
              ml={-5}
              mr="2"
            />
            <Flex flexDir="column">
              <Link href="/">
                <Text
                  cursor="pointer"
                  fontSize="22"
                  fontWeight="bold"
                  color="#000"
                >
                  Uppernodes
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex
            borderRadius="5"
            mt="4"
            w={size.width > 800 ? 500 : 350}
            flexDir="column"
            p="4"
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            justify="center"
            align="center"
            bg="#FFF"
          >
            <Text color="#777" fontSize="xl" fontWeight="bold">
              Recuperar sua conta
            </Text>

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              autoCapitalize="none"
              placeholder="Digite seu email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <Flex
              onClick={() => {
                if (!email) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu email",
                  });
                } else {
                  //
                }
              }}
              _hover={{
                transition: "0.5s",
                color: "#FFF",
                backgroundColor: "green",
              }}
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#ddd"
              color="#333"
              borderRadius="5"
              justify="center"
              align="center"
            >
              Continuar
            </Flex>

            <div
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 20,
              }}
            />
            <Flex justify="space-around" w="100%">
              <Link href="/auth/signin">
                <Text cursor="pointer" color="#0000aa" fontSize="sm" mt="4">
                  Entrar
                </Text>
              </Link>
              <Text ml="15" color="#0000aa" fontSize="sm" mt="4">
                •
              </Text>
              <Link href="/auth/signup">
                <Text cursor="pointer" color="#0000aa" fontSize="sm" mt="4">
                  Criar sua conta
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex
            borderTop="1px solid #e0e0e0"
            w={size.width > 800 ? 500 : 350}
            flexDir="column"
            justify="center"
            align="center"
          ></Flex>
        </Flex>
      )}
    </Flex>
  );
}
