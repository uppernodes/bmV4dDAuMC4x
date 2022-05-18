import {
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import { api } from "../../../services/apiClient";
import { string } from "yup";
import TopNav from "../../../components/TopNav";
import { RiDeleteBin4Line, RiEditLine, RiShareLine } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";

export default function UserId() {
  const router = useRouter();
  const { _id } = router.query;

  const [loading, setLoading] = useState(true);

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

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const size = useWindowSize();
  const toast = useToast();

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

  const [course, setCourse] = useState<Course | null>();

  useEffect(() => {
    handleGetCourseById();
  }, [_id]);

  async function handleGetCourseById() {
    try {
      if (router.pathname === "/curso") {
        if (_id) {
          await api.get(`/content/course/${_id}`).then((res) => {
            if (res.status === 200) {
              setCourse(res.data);
              setLoading(false);
            } else if (res.status === 500) {
              toast({
                status: "error",
                description: "Curso não encontrado",
              });
            }
          });
          // setCourse(response.data);
          setLoading(false);
        } else {
          toast({
            status: "error",
            description: "Curso não encontrado",
          });
        }
      }
    } catch (err) {
      toast({
        status: "error",
        description: "Curso não encontrado",
      });
      router.push("/");
    }
  }


  
  return (
    <>
      <TopNav />

      <Flex
        maxW={1000}
        w="100%"
        mx="auto"
        style={{
          paddingTop: 100,
        }}
      >
        {isWideVersion ? (
          <Flex flexDir="column" px="4" w="100%">
            <Flex align="center" justify="space-between" w="100%">
              <Image
                mt="4"
                borderRadius="5"
                src="https://img-c.udemycdn.com/course/480x270/3874004_9d64.jpg"
                style={{
                  width: 250,
                }}
              />
              <Icon
                cursor="pointer"
                as={RiShareLine}
                color="#333"
                fontSize="3xl"
              />
            </Flex>

            <Text
              mt="4"
              color="#000"
              fontWeight="bold"
              fontSize={isWideVersion ? "5xl" : "xl"}
            >
              {course && course.name}
            </Text>

            <Text
              color="#000"
              fontWeight="thin"
              fontSize={isWideVersion ? "2xl" : "xl"}
            >
              {course && course.description}
            </Text>

            <Flex mt="4" justify="space-between" w="100%">
              <Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg="#333"
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color="#FFF" fontWeight="bold">
                    Adicionar modulo
                  </Text>
                </Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg="#333"
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color="#FFF" fontWeight="bold">
                    Adicionar usuario
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg="#333"
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color="#FFF" fontWeight="bold">
                    Editar dados
                  </Text>
                  <Icon as={RiEditLine} color="#FFF" fontSize="lg" />
                </Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg="tomato"
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color="#FFF" fontWeight="bold">
                    Deletar curso
                  </Text>
                  <Icon
                    ml="2"
                    cursor="pointer"
                    as={RiDeleteBin4Line}
                    color="#FFF"
                    fontSize="lg"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex flexDir="column" borderRadius="5" bg="#eee" mt="8">
              <Flex
                w="100%"
                py="6"
                px="4"
                justify="space-between"
                cursor="pointer"
              >
                <Text color="#000">Modulo I</Text>
                <Icon as={BiChevronDown} color="#000" fontSize="xl" />
              </Flex>
              <Flex
                w="100%"
                py="6"
                px="4"
                justify="space-between"
                cursor="pointer"
              >
                <Text color="#000">Modulo II</Text>
                <Icon as={BiChevronDown} color="#000" fontSize="xl" />
              </Flex>
              <Flex
                w="100%"
                py="6"
                px="4"
                justify="space-between"
                cursor="pointer"
              >
                <Text color="#000">Modulo III</Text>
                <Icon as={BiChevronDown} color="#000" fontSize="xl" />
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <>
            <Text color="#333" fontSize="xl">
              {course && course.name}
            </Text>
          </>
        )}
      </Flex>
    </>
  );
}
