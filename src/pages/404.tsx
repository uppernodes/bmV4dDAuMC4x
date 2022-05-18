import React, { useContext } from "react";
import {
  Text,
  Flex,
  Button,
  Image,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  useBreakpointValue,
  toast,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  RiDiscLine,
  RiDiscordFill,
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiLinkedinFill,
  RiUserLine,
} from "react-icons/ri";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Head from "next/head";
import { Context } from "../contexts/ContextProvider";

// 404 Illustration
// by Natasha Kukhalskaya

export default function NotFound() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const { user, signOut, darkMode, setDarkMode } = useContext(Context);

  const toast = useToast();
  const router = useRouter();

  // function Header() {
  //   return (
  //     <Flex
  //       align="center"
  //       pt="4"
  //       p="4"
  //       bg="#fafafa"
  //       w="100vw"
  //       style={{ height: 80 }}
  //     >
  //       <Flex
  //         justify="space-between"
  //         align="center"
  //         py="4"
  //         w="100%"
  //         mx="auto"
  //         maxW={1000}
  //       >
  //         <Flex align="center">
  //           <Image
  //             src="https://06d2-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
  //             w="45"
  //             h="45"
  //             mr="2"
  //           />
  //           <Text fontWeight="bold" color="#000">
  //             uppernodes
  //           </Text>
  //         </Flex>
  //         <Flex align="center">
  //           <Menu>
  //             <MenuButton
  //               mt="1"
  //               borderRadius="full"
  //               p="2"
  //               _hover={{
  //                 height: 40,
  //                 width: 40,
  //                 backgroundColor: "#eee",
  //               }}
  //               style={{
  //                 height: 40,
  //                 width: 40,
  //               }}
  //               ml="5"
  //             >
  //               <Icon
  //                 mt="1"
  //                 as={RiUserLine}
  //                 cursor="pointer"
  //                 color="#000"
  //                 fontSize="20"
  //               />
  //             </MenuButton>
  //             <MenuList
  //               bg="#f0f0f0"
  //               boxShadow="rgba(0,0,0,0.1) 0 0 10px"
  //               py="0"
  //             >
  //               <MenuItem
  //                 _hover={{
  //                   backgroundColor: "#e0e0e0",
  //                   borderRadius: 5,
  //                 }}
  //                 justifyContent="space-between"
  //                 py="4"
  //                 onClick={() => {}}
  //                 color="#333"
  //                 fontSize="sm"
  //               >
  //                 Quero saber mais
  //               </MenuItem>
  //               <MenuItem
  //                 _hover={{
  //                   backgroundColor: "#e0e0e0",
  //                   borderRadius: 5,
  //                 }}
  //                 justifyContent="space-between"
  //                 py="4"
  //                 onClick={() => {}}
  //                 color="#333"
  //                 fontSize="sm"
  //               >
  //                 Quero vender meu curso
  //               </MenuItem>
  //               <MenuItem
  //                 _hover={{
  //                   backgroundColor: "#e0e0e0",
  //                   borderRadius: 5,
  //                 }}
  //                 justifyContent="space-between"
  //                 py="4"
  //                 onClick={() => {}}
  //                 color="#333"
  //                 fontSize="sm"
  //               >
  //                 Quero vender meu ebook
  //               </MenuItem>
  //               <MenuItem
  //                 _hover={{
  //                   backgroundColor: "#e0e0e0",
  //                   borderRadius: 5,
  //                 }}
  //                 justifyContent="space-between"
  //                 py="4"
  //                 onClick={() => {}}
  //                 color="#333"
  //                 fontSize="sm"
  //               >
  //                 Quero uma paginas de venda
  //               </MenuItem>
  //             </MenuList>
  //           </Menu>
  //           <Link href="/auth/signup">
  //             <Flex
  //               cursor="pointer"
  //               px="4"
  //               py="2"
  //               ml="4"
  //               borderRadius="5"
  //               bg="#F00066"
  //               justify="center"
  //               align="center"
  //               fontSize="14"
  //               color="#FFF"
  //               fontWeight="bold"
  //             >
  //               Contate-nos
  //             </Flex>
  //           </Link>
  //         </Flex>
  //       </Flex>
  //     </Flex>
  //   );
  // }

  function Content() {
    return (
      <Flex
        flexDir="column"
        justify="space-between"
        align="center"
        maxW={1000}
        mx="auto"
        p="4"
        w="100%"
        h="100%"
      >
        <Flex
          position="sticky"
          justify="center"
          left="4"
          top="5"
          w="100%"
          align="center"
          maxW={700}
          mx="auto"
        >
          <Flex
            borderRadius="full"
            px="12"
            py="4"
            w="100%"
            bg="#FFF"
            justify="center"
            align="center"
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            color="#744CC6"
            fontFamily="'Comfortaa', cursive"
            fontWeight="bold"
            fontSize="lg"
          >
            Página não encontrada
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text
            mt="4"
            color="#744CC6"
            fontFamily="'Comfortaa', cursive"
            fontWeight="bold"
            w="100%"
            textAlign="left"
            fontSize={isWideVersion ? "5xl" : "4xl"}
          >
            Oops
          </Text>
          <Text
            w="100%"
            textAlign="left"
            color="#744CC6"
            fontFamily="'Comfortaa', cursive"
            fontSize={isWideVersion ? "3xl" : "xl"}
          >
            Algo de errado não está certo!
          </Text>
        </Flex>
        <Image
          src="https://f5a5-168-228-216-82.sa.ngrok.io/images/404.png"
          mr="2"
          mx="10"
          maxW={isWideVersion ? 500 : 350}
        />
        <Flex flexDir="column" w="100%" maxW={700} mr="2" align="flex-end">
          <Link
            href="https://dribbble.com/shots/14468614-404-Illustration"
            passHref={true}
          >
            <Text
              cursor="pointer"
              color="#F00066"
              fontSize="md"
              fontWeight="bold"
              fontFamily="'Quicksand', sans-serif"
            >
              404
            </Text>
          </Link>
          <Link href="https://dribbble.com/natashakukhalskaya" passHref={true}>
            <Text
              cursor="pointer"
              color="#F00066"
              fontWeight="semibold"
              fontSize="xs"
              fontFamily="'Quicksand', sans-serif"
            >
              by Natasha Kukhalskaya
            </Text>
          </Link>
        </Flex>
        <Flex
          onClick={() => {
            router.push("/");
          }}
          _hover={{
            boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
            textDecorationLine: "underline",
          }}
          cursor="pointer"
          mt="4"
          w="100%"
          maxW={700}
          textAlign="left"
          borderRadius="5"
          px="6"
          py="4"
          bg="#744CC6"
          justify="center"
          align="center"
          color="#FFF"
          fontFamily="'Comfortaa', cursive"
          fontWeight="bold"
          fontSize={isWideVersion ? "xl" : "lg"}
        >
          Voltar para o início
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex
        mt="10"
        flexDir="row"
        p="4"
        w="100%"
        maxW={1000}
        mx="auto"
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        borderRadius="5"
        align="center"
        justifyContent="space-between"
      >
        <Flex flexDir="column">
          <Link
            href="https://dribbble.com/shots/14468614-404-Illustration"
            passHref={true}
          >
            <Text
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
              fontSize="lg"
              fontWeight="bold"
              fontFamily="'Quicksand', sans-serif"
            >
              Uppernodes
            </Text>
          </Link>
          <Link href="https://dribbble.com/natashakukhalskaya" passHref={true}>
            <Text
              cursor="pointer"
              color={darkMode ? "#FFF" : "#333"}
              fontWeight="regular"
              fontSize="xs"
              fontFamily="'Quicksand', sans-serif"
            >
              Siga-nos em nossas redes sociais
            </Text>
          </Link>
        </Flex>
        <Flex align="center">
          <Icon
            onClick={() => {
              toast({
                status: "warning",
                description: "Em breve teremos nosso servidor no discord",
              });
            }}
            cursor="pointer"
            as={RiDiscordFill}
            mr={isWideVersion ? "6" : "4"}
            color="#744cc6"
            fontSize="4xl"
          />
          <Link href="https://linkedin.com/in/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiLinkedinFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://facebook.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiFacebookFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://github.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiGithubFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Flex flex="1" flexDir="column" h="100vh" bg={darkMode ? "#333" : "#eee"} justifyContent="space-between">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
        </Head>
        <Header />
        <Content />
        <Footer />
      </Flex>
      <Flex />
    </>
  );
}
