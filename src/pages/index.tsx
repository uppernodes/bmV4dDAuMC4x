import { GetServerSideProps } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Img,
  Input,
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useEditableControls,
  useEditableState,
  useToast,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../contexts/ContextProvider";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../services/apiClient";

import { MdDarkMode, MdTouchApp } from "react-icons/md";

import Header from "../components/Header";
import {
  RiCloseLine,
  RiDiscordFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPauseFill,
  RiPlayFill,
  RiPlayLine,
  RiTwitterFill,
  RiYoutubeFill,
} from "react-icons/ri";
import Head from "next/head";
import { Html, Main, NextScript } from "next/document";
import Loading from "../components/Loading";
import { useWindowSize } from "../utils/useWindowSize";

export default function Index() {
  const { user, signOut, darkMode, handleSetDarkMode, setDarkMode, loading } =
    useContext(Context);

  const [playing, setPlaying] = useState(true);

  const [banner, setBanner] = useState(false);

  const size = useWindowSize();

  const router = useRouter();

  const [over, setOver] = useState("");

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function Banner() {
    return (
      <Flex
        mt="4"
        flexDir="column"
        borderRadius="5"
        p="4"
        w={size.width - 50}
        maxW={1000}
        mx="auto"
        bg="#999"
      >
        <Flex justify="space-between" w="100%" align="center">
          <Text color="#FFF" fontWeight="bold" fontSize="20" w="80%">
            Coronavirus (COVID-19) resources and updates
          </Text>
          <Icon
            cursor="pointer"
            onClick={() => setBanner(!banner)}
            as={RiCloseLine}
            color="#FFF"
            fontSize="20"
          />
        </Flex>

        <Text color="#FFF" w="80%">
          The safety and well-being of everyone who uses Uber is always our
          priority. We are actively monitoring the coronavirus (COVID-19)
          situation and are taking steps to help keep our communities safe.
          Click here for more information.
        </Text>
      </Flex>
    );
  }

  function DarkMode() {
    return (
      <Flex w="100%" maxWidth={user ? "100vw" : 1000} mx="auto">
        <Flex
          ml={user ? "4" : size.width < 1000 && "4"}
          mt="4"
          onMouseOver={() => {
            setOver("Darkmode");
          }}
          onClick={() => {
            if (user) {
              setDarkMode(!darkMode);
            } else {
              handleSetDarkMode(!darkMode);
            }
          }}
          cursor="pointer"
          boxShadow={
            darkMode
              ? "rgba(200,200,200,0.1) 0 0 10px"
              : "rgba(0,0,0,0.1) 0 0 10px"
          }
          align="center"
          justify={over === "Darkmode" ? "space-between" : "center"}
          p="4"
          mb="4"
          style={{
            height: 45,
            width: over === "Darkmode" ? 200 : 45,
          }}
          borderRadius="full"
          flexDir="row"
        >
          <Icon as={MdDarkMode} color={darkMode ? "#FFF" : "#333"} />
          {over === "Darkmode" && (
            <Text
              fontWeight="bold"
              color={darkMode ? "#FFF" : "#333"}
              fontSize="xs"
            >
              {darkMode
                ? "Experimente o modo light"
                : "Experimente o modo dark"}
            </Text>
          )}
        </Flex>
      </Flex>
    );
  }

  function Apresentation() {
    return (
      <Flex
        onMouseOver={() => {
          if (over !== "DarkMode") {
            setOver("");
          }
        }}
        flexDir="column"
        mx="auto"
        w={size.width - 50}
        maxWidth={user ? "100vw" : 1000}
      >
        <Text
          color={darkMode ? "#FFF" : "#333"}
          fontWeight="bold"
          fontSize={isWideVersion ? "4xl" : "3xl"}
          w={isWideVersion ? "60%" : "100%"}
        >
          {user && user._id
            ? `Olá ${user.name.split(" ")[0]}`
            : "A plataforma completa para transformar criadores de conteúdo em empreendedores"}
        </Text>
        <Text
          color={darkMode ? "#FFF" : "#333"}
          fontSize="lg"
          w={isWideVersion ? "60%" : "100%"}
        >
          {user && user._id
            ? `Acesse sua dashboard para controlar seus produtos, vendas e usuários`
            : "Crie seus produtos, acelere suas vendas, gerencie seus resultados e escale seu negócio digital."}
        </Text>
        <Flex
          onClick={() => {
            if (user && user._id) {
              router.push("/admin");
            } else {
              router.push("/auth/signup");
            }
          }}
          _hover={{
            opacity: 0.8,
          }}
          cursor="pointer"
          mt="4"
          borderRadius="5"
          bg="#F00066"
          justify="center"
          align="center"
          style={{ height: 50, width: 200 }}
        >
          <Text color="#FFF" fontWeight="bold">
            {user && user._id ? `Ir para dashboard` : "Crie o seu produto"}
          </Text>
        </Flex>
        {!user && (
          <Text
            mt="4"
            color={darkMode ? "#FFF" : "#333"}
            fontSize="xs"
            w={isWideVersion ? "60%" : "100%"}
          >
            Experimente uppernodes grátis, sem cartão de crédito. Basta se
            registrar e ter acesso a sua conta como criador de conteúdo.
          </Text>
        )}
        {/* {!user && (
          <Flex mt="10" justify="center" align="center">
            <Image
              w={size.width - 50}
              maxW={1000}
              mx="auto"
              borderRadius="5"
              src="https://images.pexels.com/photos/3769999/pexels-photo-3769999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Flex
              cursor="pointer"
              borderRadius="full"
              p="5"
              border="2.5px solid #FFF"
              position="absolute"
              bg="rgba(0,0,0, 0.5)"
              justify="center"
              align="center"
            >
              <Icon as={RiPlayFill} color="#FFF" fontSize="50" />
            </Flex>
          </Flex>
        )} */}
      </Flex>
    );
  }

  function Marketplace() {
    return (
      <Flex
        flexDir="column"
        style={{
          height: isWideVersion && size.height,
        }}
        justify="space-between"
        align="center"
        py={isWideVersion ? "20" : "10"}
        px="8"
        mt="10"
        bg="#000"
        w={size.width}
      >
        <Flex flexDir="column" mx="auto" w="100%" maxW={1000}>
          <Flex
            flexDir={isWideVersion ? "row" : "column"}
            w="100%"
            justify="space-between"
            align="center"
          >
            <Text
              color="#FFF"
              w="100%"
              fontWeight="bold"
              fontSize={isWideVersion ? "5xl" : "5xl"}
            >
              {isWideVersion ? "Comunidade ativa" : "Comunidade"}
            </Text>
            <Flex w="100%" align="center">
              <Icon
                onClick={() => alert("Criar conta no linkedin e fazer o link")}
                cursor="pointer"
                as={RiLinkedinBoxFill}
                mr={isWideVersion ? "5" : "2"}
                color="#FFF"
                fontSize="4xl"
              />
              <Icon
                onClick={() =>
                  alert("Criar comunidade no discord e fazer o link")
                }
                cursor="pointer"
                as={RiDiscordFill}
                mr={isWideVersion ? "5" : "2"}
                color="#FFF"
                fontSize="4xl"
              />
              <Icon
                onClick={() =>
                  alert("Criar repositorio no github e fazer o link")
                }
                cursor="pointer"
                as={RiGithubFill}
                mr={isWideVersion ? "5" : "2"}
                color="#FFF"
                fontSize="4xl"
              />
            </Flex>
          </Flex>
          <Text
            color="#FFF"
            mt="4"
            fontSize={isWideVersion ? "2xl" : "lg"}
            w="70%"
          >
            Conecte-se com criadores de conteudo, explore por novos produtos e
            um mundo de oportunidades.
          </Text>
          <Flex mt="10" style={{ height: 1, width: "100%" }} bg="#222" />
        </Flex>

        <Flex
          mx="auto"
          w="100%"
          maxW={1000}
          flexDir={isWideVersion ? "row" : "column"}
          my={isWideVersion ? "4" : "8"}
          mt="10"
          justify={isWideVersion && "space-between"}
        >
          <Flex
            onClick={() => alert("Criar tela de produtos e fazer o link")}
            boxShadow="rgba(255,255,255,0.1) 0px 0 10px"
            cursor="pointer"
            borderRadius="5"
            bg="#111"
            mt={!isWideVersion && "5"}
            mr="4"
            border="1px solid #333"
            style={{
              width: isWideVersion ? 300 : "100%",
            }}
            flexDir="column"
          >
            <Flex p="6">
              <Text color="#FFF" fontWeight="bold" fontSize="lg">
                Produtos
              </Text>
            </Flex>
            <Image
              src="https://cdn.dribbble.com/users/220212/screenshots/15436684/media/23864ee7141adc4fc01c5b4ba862d5bd.png"
              borderBottomLeftRadius="5"
              borderBottomRightRadius="5"
              style={{}}
            />
          </Flex>
          <Flex
            onClick={() => alert("Criar tela de templates e fazer o link")}
            boxShadow="rgba(255,255,255,0.1) 0px 0 10px"
            cursor="pointer"
            borderRadius="5"
            bg="#111"
            mr="4"
            mt={!isWideVersion && "5"}
            border="1px solid #333"
            style={{
              width: isWideVersion ? 300 : "100%",
            }}
            flexDir="column"
          >
            <Flex p="6">
              <Text color="#FFF" fontWeight="bold" fontSize="lg">
                Templates
              </Text>
            </Flex>
            <Image
              src="https://cdn.dribbble.com/users/220212/screenshots/11531183/media/8311bf6300cf8a32e2b761de8ef4aa81.png"
              borderBottomLeftRadius="5"
              borderBottomRightRadius="5"
              style={{}}
            />
          </Flex>
          <Flex
            onClick={() => alert("Criar tela de plugins e fazer o link")}
            boxShadow="rgba(255,255,255,0.1) 0px 0 10px"
            cursor="pointer"
            borderRadius="5"
            bg="#111"
            mt={!isWideVersion && "5"}
            border="1px solid #333"
            style={{
              width: isWideVersion ? 300 : "100%",
            }}
            flexDir="column"
          >
            <Flex p="6">
              <Text color="#FFF" fontWeight="bold" fontSize="lg">
                Plugins
              </Text>
            </Flex>
            <Image
              src="https://cdn.dribbble.com/users/220212/screenshots/14485419/media/a6d9b11f0743cb162023738146143f16.png"
              borderBottomLeftRadius="5"
              borderBottomRightRadius="5"
              style={{}}
            />
          </Flex>
        </Flex>
        {/* <Flex
          cursor="pointer"
          my="4"
          maxW={1000}
          mx="auto"
          borderRadius="5"
          bg="#F00066"
          justify="center"
          align="center"
          style={{
            height: isWideVersion ? 100 : 50,
            width: "100%",
          }}
        >
          <Text
            color="#FFF"
            fontWeight="bold"
            fontSize={isWideVersion ? "2xl" : "lg"}
          >
            Acessar comunidade
          </Text>
        </Flex> */}
      </Flex>
    );
  }

  function Dashboard() {
    return (
      <Flex
        borderRadius="5"
        boxShadow="rgba(255,255,255,0.1) 0 0 10px"
        px="5"
        pt="5"
        bg={darkMode ? "#FAFAFA" : "#000"}
        mb="10"
        w={size.width - 50}
        maxW={1000}
        mx="auto"
      >
        {isWideVersion && (
          <Image
            src="https://github.com/ricardofsdomene.png"
            borderRadius="5"
            mb="5"
            style={{ height: 350, width: size.width / 2 - 50 }}
          />
        )}
        <Flex
          flexDir="column"
          px={isWideVersion && "5"}
          pb="5"
          justify="space-between"
        >
          <Text
            color={darkMode ? "#333" : "#FFF"}
            fontWeight="bold"
            fontSize={isWideVersion ? "3xl" : "xl"}
          >
            Sem códigos. Sem integrações quebradas. Sem mensalidades. Apenas uma
            porcentagem quando você vende.
          </Text>
          <Flex
            fontWeight="bold"
            color={darkMode ? "#FFF" : "#333"}
            _hover={{
              backgroundColor: "#eee",
              transition: "0.2s",
              color: darkMode ? "#333" : "#FFF",
            }}
            mt="4"
            cursor="pointer"
            justify="center"
            align="center"
            bg={darkMode ? "#000" : "#FFF"}
            style={{ width: "100%", height: 50 }}
            borderRadius="5"
          >
            Criar meu site
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex
        flexDir="column"
        borderRadius="5"
        p="5"
        mt="10"
        mx="auto"
        w={size.width}
        boxShadow={
          darkMode
            ? "rgba(155,155,155,0.1) 0 0 10px"
            : "rgba(0,0,0,0.1) 0 0 10px"
        }
      >
        <Text color={darkMode ? "#FFF" : "#000"} fontSize="sm">
          Termos e Politicas
        </Text>
        <Text mt="4" color={darkMode ? "#AAA" : "#555"} fontSize="sm">
          uppernodes — 2022 © Todos os direitos reservados
        </Text>
        <Text mt="4" color={darkMode ? "#AAA" : "#555"} fontSize="sm">
          uppernodes co.
          <Text color={darkMode ? "#AAA" : "#555"} fontSize="sm">
            CNPJ nº. 11.233.455/0000-22
          </Text>
          <Text color={darkMode ? "#AAA" : "#555"} fontSize="sm">
            Contato: uppernodes@gmail.com
          </Text>
        </Text>
      </Flex>
    );
  }

  function FAQ() {
    return (
      <Flex my="20" maxW={1000} w={size.width - 50} borderRadius="5" mx="auto">
        <Accordion
          bg={darkMode ? "#FFF" : "#000"}
          w="100%"
          borderRadius="5"
          border="0px solid transparent"
          boxShadow={
            darkMode
              ? "rgba(155,155,155,0.1) 0 0 10px"
              : "rgba(0,0,0,0.1) 0 0 10px"
          }
        >
          <AccordionItem py="5" borderRadius="5">
            <h2>
              <AccordionButton
                borderRadius="5"
                outline="none !important"
                boxShadow="none !important"
              >
                <Flex flexDir="column" w="100%">
                  <Box
                    color={darkMode ? "#333" : "#FFF"}
                    flex="1"
                    textAlign="left"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    Qual servico a uppernodes oferece?
                  </Box>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontSize="md"
                    color={darkMode ? "#555" : "#FFF"}
                  >
                    1 minuto de leitura
                  </Box>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={darkMode ? "#555" : "#FFF"}>
              Somos uma plataforma completa. Do suporte ao cliente, passando por
              dados, relatórios e sistema de pagamento, nós vamos cobrir tudo!
              Todas as nossas soluções são criadas e pensadas para os nossos
              clientes. E nossos desenvolvedores nunca param! Novas ferramentas
              são criadas e otimizadas o tempo todo, acompanhando as tendências
              do mercado e o crescimento do seu negócio!
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem py="5" border="0px solid transparent" borderRadius="5">
            <h2>
              <AccordionButton
                borderRadius="5"
                outline="none !important"
                boxShadow="none !important"
              >
                <Flex flexDir="column" w="100%">
                  <Box
                    color={darkMode ? "#333" : "#FFF"}
                    flex="1"
                    textAlign="left"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    Quanto custa para usar?
                  </Box>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={darkMode ? "#333" : "#FFF"}>
              A uppernodes não cobra taxas de adesão e nem mensalidades. Para
              montar todo o seu negócio digital na uppernodes, você não paga
              nada, apenas uma porcentagem por cada venda realizada.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    );
  }

  if (user) {
    if (loading) {
      return <Loading />;
    }
  } else {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Flex
        flex="1"
        flexDir="column"
        justify="space-between"
        h="100vh"
        bg={darkMode ? "#333" : "#EEE"}
      >
        <Flex flexDir="column">
          <Flex
            onMouseOver={() => {
              if (over !== "DarkMode") {
                setOver("");
              }
            }}
          >
            <Header none={false} />
          </Flex>
          {banner && <Banner />}
          <DarkMode />
          <Apresentation />
          {user ? (
            <></>
          ) : (
            <>
              <Marketplace />
              <FAQ />
              <Dashboard />
            </>
          )}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  return {
    props: {},
  };
};
