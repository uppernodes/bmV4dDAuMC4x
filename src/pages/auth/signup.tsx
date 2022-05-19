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
import { Context } from "../../contexts/ContextProvider";
import { useWindowSize } from "../../utils/useWindowSize";

export default function SignUp() {
  const { user, signIn, signUp } = useContext(Context);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const size = useWindowSize();

  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      if (user._id) {
        router.push("/admin");
      }
    }
  }, [user]);

  async function handleSignUp() {
    const response = await signUp({ name, email, password });
    if (response.status === "Erro!") {
      toast({
        status: "error",
        description: response.error,
      });
    } else {
      toast({
        status: "success",
        description: response.message,
      });
    }
  }

  return (
    <Flex
      h={size.width > 550 ? "100vh" : "110vh"}
      maxH={size.width > 550 ? "100vh" : "110vh"}
      bg="#fafafa"
    >
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
              src="http://localhost:5556/images/inconformedia.png"
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
            <Text color="#555" fontSize="xl" fontWeight="bold">
              Crie sua conta
            </Text>

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              autoCapitalize="words"
              mt="4"
              placeholder="Seu nome completo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              type="email"
              placeholder="Digite seu email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              placeholder="Sua senha"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />

            <Text mt="4" fontSize="xs" color="#aaa">
              Ao se registrar, voce concorda que leu e que aceita os nossos
              Termos de Servico e Politica de Privacidade.
            </Text>
            <Flex
              onClick={() => {
                if (!name) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu nome completo",
                  });
                } else if (!name.split(" ")[1]) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu nome completo",
                  });
                } else if (!email) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu email",
                  });
                } else if (!password) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir sua senha",
                  });
                } else if (password.length < 8) {
                  toast({
                    status: "error",
                    description: "Sua senha precisa de pelo menos 8 digitos",
                  });
                }
                if (name && name.split(" ")[1] && email && password) {
                  handleSignUp();
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
            <Text mt="4" fontSize="xs" color="#aaa">
              OU
            </Text>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiGoogleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Google</Text>
            </Flex>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiAppleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Apple</Text>
            </Flex>

            <div
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 20,
              }}
            />
            <Link href="/auth/signin">
              <Text color="#0000aa" cursor="pointer" fontSize="sm" mt="4">
                Entrar na sua conta
              </Text>
            </Link>
          </Flex>
          <Flex
            borderTop="1px solid transparent"
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
