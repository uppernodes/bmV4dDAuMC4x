import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillAmazonSquare, AiFillCloud } from "react-icons/ai";
import { BiInfoCircle, BiListPlus, BiUserPlus } from "react-icons/bi";
import { FiArrowUpCircle, FiChevronDown } from "react-icons/fi";
import {
  RiDeleteBinFill,
  RiInformationFill,
  RiLineFill,
  RiMenuLine,
  RiNotification2Line,
} from "react-icons/ri";
import TopNav from "../../components/TopNav";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/apiClient";

export default function Produtos() {
  const { user } = useContext(AuthContext);

  type Course = {
    _id: string;
    creator: {
      _id: string;
    };
    name: string;
    description?: string;
    requisites?: [string];
    models: [string];
  };

  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const toast = useToast();
  const size = useWindowSize();

  useEffect(() => {
    handleGetProdutos();
  }, [user]);

  const handleGetProdutos = async () => {
    if (user && user._id) {
      await api.get(`/content/courses/${user._id}`).then((res) => {
        setCourses(res.data);
        setLoading(false);
      });
    }
  };

  const handleDeleteCurso = function (id) {
    return new Promise(async function (resolve, reject) {
      if (id) {
        const response = await api.delete(`/content/course/${id}`);
        if (response.data.message === "Curso deletado com sucesso!") {
          resolve(response.data.message);
          {
            toast({
              duration: 500,
              position: "top-end",
              status: "success",
              description: response.data.message,
            });
          }
        } else {
          {
            toast({
              duration: 500,
              position: "top-end",
              status: "error",
              description: response.data.message,
            });
          }
        }
      } else {
        reject(Error("Not able to delete course"));
      }
    });
  };

  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function Courses() {
    function Course({ id, name }) {
      return (
        <Flex
          cursor="pointer"
          onClick={() => {
            router.push(`/curso/${id}`);
          }}
          mr="4"
          mb="4"
          borderRadius="5"
          style={{
            width: isWideVersion ? 300 : "100%",
            height: 300,
          }}
          bg="#333"
        >
          <Flex
            p="6"
            borderTopLeftRadius="5"
            borderTopRightRadius="5"
            justify="center"
            align="center"
            w="100%"
            style={{
              height: 100,
            }}
            bg="#222"
          >
            <Text color="#FFF" fontSize="xl">
              E se for um curso tipo muitoo grande com titulo de doido assimkkk
            </Text>
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex flexDir="column" w="100%" maxW={1000} mx="auto">
        <Text
          fontWeight="extrabold"
          fontFamily="sans-serif"
          color="#333"
          fontSize="4xl"
        >
          SEUS CURSOS
        </Text>
        <Flex flexDir={isWideVersion ? "row" : "column"} mt="4">
          {courses.length > 0 &&
            courses.map((c, i) => {
              return (
                <Flex w="100%" justify="space-between">
                  <Course key={i} id={c._id} name={c.name} />
                </Flex>
              );
            })}
        </Flex>
      </Flex>
    );
  }

  if (loading) {
    return (
      <Flex
        flexDir="column"
        bg="#EEE"
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
      >
        <Spinner color="#333" size="xl" />
        <Text color="#333" mt="4" fontSize="xl">
          Aguarde enquanto carregamos seu conteúdo...
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <TopNav />
      <Flex p="4" style={{ paddingTop: 100 }}>
        {isWideVersion ? (
          <>
            <Courses />
          </>
        ) : (
          <>
            <Courses />
          </>
        )}
      </Flex>
    </>
  );
}
