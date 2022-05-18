import {
  Button,
  Divider,
  Flex,
  Heading,
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
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Auth() {
  const { user, signIn, signUp } = useContext(AuthContext);

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
    <Flex maxH={size.height} h="100vh" bg="#eee">
      {user ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="xl" color="facebook.400" />
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
}
