import {
  Flex,
  Icon,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import {
  RiDiscordFill,
  RiFacebookFill,
  RiGithubFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";
import Header from "../Header";

export default function Loading() {
  const { darkMode } = useContext(Context);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const toast = useToast();

  function Footer() {
    return (
      <Flex
        mt="10"
        flexDir="row"
        p="4"
        w="100%"
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
              color="#333"
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
              color="#333"
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
    <Flex
      flex="1"
      flexDir="column"
      h="100vh"
      justifyContent="space-between"
      bg="#EEE"
    >
      <Header none />
      <Flex
        flexDir="column"
        justifyContent="center"
        w="100%"
        h="50%"
        align="center"
      >
        <Spinner color="#333" size="xl" />
        <Text color="#333" mt="10" fontWeight="thin" fontSize="xl">
          Aguarde enquanto carregamos seu conteúdo
        </Text>
      </Flex>
      <Footer />
    </Flex>
  );
}
