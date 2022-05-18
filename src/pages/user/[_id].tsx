import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { api } from "../../services/apiClient";
import { string } from "yup";

export default function UserId() {
  const router = useRouter();
  const { _id } = router.query;
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

  const size = useWindowSize();

  type User = {
    _id: string;
    createdAt: string;
    email: string;
    name: string;
    avatar: string;
    permissions?: [string];
    roles?: [string];
  };

  const [user, setUser] = useState<User | null>();

  async function fetchUserById() {
    const response = await api.get(`/auth/user/${_id}`);
    if (response) {
      if (!response.data.error) {
        setUser(response.data);
      }
    } else if (response.data.error) {
      setUser(null);
    }
  }

  useEffect(() => {
    fetchUserById();
  }, [_id]);

  return (
    <Flex flexDir="column">
      <Header />

      <Flex
        mt="4"
        maxW={1000}
        mx="auto"
        bg="#eee"
        w={size.width - 50}
        borderRadius="5"
      >
        <Flex
          bg="#e0e0e0"
          style={{
            height: 150,
            width: "100%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          p="4"
        >
          {user && !user._id ? (
            <Text
              color="#000"
              fontSize={size.width > 600 ? "2xl" : "xl"}
              fontWeight="bold"
            >
              Usuario nao encontrado
            </Text>
          ) : (
            <Text color="#000">{user && user._id}</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
