import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter();
  const { _id } = router.query;

  const [message, setMessage] = useState(
    "Aguarde enquanto configuramos o seu projeto"
  );

  useEffect(() => {
    setTimeout(() => {
      setMessage("Estamos preparando o seu ambiente");
    }, 5000);
    setTimeout(() => {
      setMessage("Estamos quase lá...");
    }, 9500);
    setTimeout(() => {
      setMessage("Será esse o começo de algo grande?");
    }, 15500);
    setTimeout(() => {
      setMessage("Seu projeto foi criado com sucesso! 😜");
    }, 20000);
    setTimeout(() => {
      router.push(`/curso/${_id}`);
    }, 21000);
  }, []);

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      bg="#000"
      justify="center"
      align="center"
    >
      <Spinner color="#FFF" size="xl" />
      <Text color="#FFF" mt="4" fontSize="xl">
        {message}
      </Text>
    </Flex>
  );
}
