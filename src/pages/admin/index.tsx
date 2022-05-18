import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Stat,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  StatArrow,
  StatGroup,
  useBreakpointValue,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiLayerPlus, BiListPlus, BiLogOut, BiUserPlus } from "react-icons/bi";
import {
  FiChevronDown,
  FiExternalLink,
  FiFolderPlus,
  FiPlusSquare,
} from "react-icons/fi";
import {
  MdDashboardCustomize,
  MdLibraryBooks,
  MdManageAccounts,
  MdSettings,
  MdSettingsApplications,
  MdStore,
} from "react-icons/md";
import {
  RiArrowDropDownFill,
  RiMenu2Line,
  RiMenuLine,
  RiMessengerFill,
  RiNotification2Line,
  RiPagesFill,
  RiPriceTagFill,
  RiPulseLine,
  RiSearch2Line,
  RiShareLine,
  RiUser3Fill,
  RiUser3Line,
  RiUserFill,
  RiVideoUploadLine,
  RiWhatsappFill,
} from "react-icons/ri";
import TopNav from "../../components/TopNav";
import { Context } from "../../contexts/ContextProvider";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

export default function Landing() {
  const { user, signOut, darkMode, setDarkMode } = useContext(Context);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const route = useRouter();

  const [publicacao, setPublicacao] = useState(false);
  const [curso, setCurso] = useState(false);
  const [produto, setProduto] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const [tarefa, setTarefa] = useState(false);

  const [over, setOver] = useState("");

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const router = useRouter();
  const size = useWindowSize();

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

  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const series = [
    {
      name: "series1",
      data: [31, 120, 10, 28, 51, 18, 109],
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: "#333",
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: "#333",
      },
      axisTicks: {
        color: "#333",
      },
      categories: [
        "2021-03-18T00:00:00.000Z",
        "2021-03-19T00:00:00.000Z",
        "2021-03-20T00:00:00.000Z",
        "2021-03-21T00:00:00.000Z",
        "2021-03-22T00:00:00.000Z",
        "2021-03-23T00:00:00.000Z",
        "2021-03-24T00:00:00.000Z",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.5,
      },
    },
  };

  function Header() {
    return (
      <Flex
        zIndex="1000"
        position="fixed"
        style={{ height: 80, width: "100vw" }}
        align="center"
        mx="auto"
        p="5"
        justify="space-between"
        flexDir="row"
      >
        <Flex flexDir="row" align="center">
          <Image
            src="https://503a-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
            w="45"
            h="45"
            mr="2"
          />
          <Text
            fontSize={isWideVersion ? "2xl" : "md"}
            fontWeight="bold"
            color="#000"
          >
            uppernodes
          </Text>
          <Flex
            style={{
              height: 50,
              width: 1,
              backgroundColor: darkMode ? "#333" : "#eee",
            }}
            mx="5"
          />
          {isWideVersion && (
            <>
              <Menu>
                <MenuButton>
                  <Text fontSize="md" cursor="pointer" color="#000">
                    Adicionar
                  </Text>
                </MenuButton>
                <MenuList
                  boxShadow="rgba(0,0,0,0.1) 0 0 10px"
                  zIndex="2"
                  bg="#eee"
                  py="0"
                >
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      onOpen();
                    }}
                    color="#333"
                    fontSize="sm"
                  >
                    Curso
                    <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                  </MenuItem>
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      onOpen();
                    }}
                    color="#333"
                    fontSize="sm"
                  >
                    Instrutor
                    <Icon as={BiUserPlus} fontSize="md" color="#facebook.400" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
        <Flex flexDir="row" align="center">
          <Menu>
            <MenuButton
              mr="5"
              onClick={() => {
                setSearch(!search);
                setSearchResults(false);
              }}
            >
              <Icon as={RiSearch2Line} mt="1.5" color="#777" fontSize="25" />
            </MenuButton>
            <MenuList
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              zIndex="2"
              bg={darkMode ? "#333" : "#eee"}
              style={{ height: "40vh" }}
            ></MenuList>
          </Menu>
          <Menu>
            <MenuButton mr="5">
              <Icon
                as={RiNotification2Line}
                mt="1.5"
                color="#777"
                fontSize="25"
              />
            </MenuButton>
            <MenuList
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              zIndex="2"
              bg={darkMode ? "#333" : "#eee"}
              style={{ height: "40vh" }}
            ></MenuList>
          </Menu>
          <Menu>
            <MenuButton>
              <Avatar
                src="https://github.com/0xrfsd.png"
                name={user ? user.name : "A"}
                size="sm"
              />
            </MenuButton>
            <MenuList
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              zIndex="2"
              bg={darkMode ? "#333" : "#eee"}
              py="0"
            >
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                {user &&
                  user.name.split(" ")[0] +
                    " " +
                    user.name.split(" ")[user.name.split(" ").length - 1]}
                <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  signOut();
                }}
                color="#333"
                fontSize="sm"
              >
                Sair da sua conta
                <Icon as={BiLogOut} fontSize="md" color="#facebook.400" />
              </MenuItem>
            </MenuList>
          </Menu>
          {!isWideVersion && (
            <Menu>
              <MenuButton ml="5">
                <Icon as={RiMenuLine} fontSize="22" color="#333" />
              </MenuButton>
              <MenuList
                boxShadow="rgba(0,0,0,0.1) 0 0 10px"
                bg={darkMode ? "#333" : "#eee"}
                py="0"
              >
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiUserPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    );
  }

  function Dashboard() {
    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Dashboard
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList boxShadow="rgba(0,0,0,0.1) 0 0 10px" bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex
          flexDir="column"
          mt="4"
          p="4"
          borderRadius="12"
          bg="#FFF"
          width="100%"
        >
          <Flex borderRadius="12" bg="#FFF" width="100%">
            <StatGroup
              flexDir="row"
              justifyContent="space-between"
              width="100vw"
            >
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Assinaturas
                </StatLabel>
                <StatNumber color="#333">345</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Faturamento
                </StatLabel>
                <StatNumber color="#333">50.715</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  18.36%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Assinantes
                </StatLabel>
                <StatNumber color="#333">345</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Flex>

          <Flex
            justify="space-between"
            align="flex-end"
            pb="4"
            borderBottom="1px solid #e3e3e3"
          >
            <Text color="#333" mt="4">
              Envie para{" "}
              <div style={{ fontWeight: "bold" }}>345 novos assinantes</div>
              uma mensagem privada.
            </Text>
            <Flex
              style={{ height: 40 }}
              px="4"
              cursor="pointer"
              flexDir="row"
              bg="#FFF"
              border="1px solid #BBB"
              justify="center"
              align="center"
              borderRadius="5"
            >
              <Text color="#333" fontWeight="bold">
                Enviar
              </Text>
            </Flex>
          </Flex>

          <Flex justify="space-between" align="flex-end" pb="1">
            <Text color="#333" mt="4">
              <div style={{ fontWeight: "bold" }}>R$8.425,45</div>
              Disponível para retirada
            </Text>
            <Flex
              style={{ height: 40 }}
              px="4"
              cursor="pointer"
              flexDir="row"
              bg="#FFF"
              border="1px solid #BBB"
              justify="center"
              align="center"
              borderRadius="5"
            >
              <Text color="#333" fontWeight="bold">
                Retirar
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }

  function Banner() {
    return (
      <Flex mt="6" flexDir="column" bg="#FFF" p="4" borderRadius="12">
        <Text color="#000" fontWeight="bold" fontSize="2xl">
          Está na hora de monetizar
        </Text>
        <Text color="#000" fontSize="md">
          Um software desenvolvido para quem deseja monetizar o seu conteúdo.
        </Text>
        <Text color="#000" fontSize="md">
          Uma maneira simples de vender.
        </Text>
        <Flex flexDir="row" align="center" justify="space-between">
          <Flex
            onClick={() => [onOpen()]}
            cursor="pointer"
            mt="4"
            borderRadius="5"
            style={{ height: 40, width: 200 }}
            bg="#333"
            justifyContent="center"
            alignItems="center"
            p="3"
          >
            <Text color="#FFF">Criar conteudo</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Products() {
    const products = [
      {
        avatar: "https://github.com/0xrfsd.png",
        faturamento: 120000,
        title: "Desenvolvimento web",
      },
      {
        avatar: "https://github.com/ricardofsdomene.png",
        faturamento: 200000,
        title: "Desenvolvimento Mobile",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Produtos
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList boxShadow="rgba(0,0,0,0.1) 0 0 10px" bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex justify="space-between" w="100%" pb="3">
            <Text color="#333">Produtos</Text>
            <Text color="#333">Receita</Text>
          </Flex>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: darkMode ? "#333" : "#eee",
            }}
          />
          <Flex flexDir="column" justify="space-between">
            {products.map((product, i) => {
              return (
                <Flex
                  key={i}
                  py="4"
                  align="center"
                  justify="space-between"
                  borderBottom={i !== products.length - 1 && "1px solid #eee"}
                  pb={i !== products.length - 1 && "3"}
                >
                  <Flex align="center">
                    <Image
                      borderRadius="5"
                      src={product.avatar}
                      style={{ height: 50, width: 50 }}
                      mr="2"
                    />
                    <Text color="#333" fontSize="sm">
                      {product.title}
                    </Text>
                  </Flex>
                  <Text color="#333" fontSize="md" fontWeight="bold">
                    R${product.faturamento}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todos os produtos
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Messages() {
    const messages = [
      {
        name: "El Ethel",
        username: "@ethel",
        avatar: "https://github.com/0xrfsd.png",
        comment: "The app looks great!",
        timestamp: "1h",
      },
      {
        name: "Daniel Simoes",
        username: "@danielscabral",
        avatar: "https://github.com/ethel.png",
        comment: "Achei facil de usar",
        timestamp: "2h",
      },
      {
        name: "Micaely Beatriz",
        username: "@ximicas",
        avatar: "https://github.com/esther.png",
        comment: "Muito bonita as interfaces.",
        timestamp: "3h",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Mensagens
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList boxShadow="rgba(0,0,0,0.1) 0 0 10px" bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex flexDir="column" justify="space-between">
            {messages.map((message, i) => {
              return (
                <Flex
                  py="4"
                  align="center"
                  justify="space-between"
                  borderBottom={i !== messages.length - 1 && "1px solid #eee"}
                  pb={i !== messages.length - 1 && "3"}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Flex>
                      <Image
                        borderRadius="5"
                        src={message.avatar}
                        style={{ height: 50, width: 50 }}
                        mr="2"
                      />
                      <Flex flexDir="column">
                        <Flex align="center">
                          <Text color="#000" fontWeight="bold" fontSize="sm">
                            {message.name}
                          </Text>
                          <Text color="#333" fontSize="xs" ml="1">
                            {message.username}
                          </Text>
                        </Flex>
                        <Text color="#000" fontSize="lg">
                          {message.comment}
                        </Text>
                      </Flex>
                    </Flex>
                    <Text color="#555">{message.timestamp}</Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todas as mensagens
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Todo() {
    const [selected, setSelected] = useState("");

    const [todos, setTodos] = useState([
      {
        id: "0x",
        title: "uppernodes ...",
      },
      {
        id: "1x",
        title: "uppernodes...",
      },
      {
        id: "2x",
        title: "uppernodes...",
      },
    ]);

    useEffect(() => {
      if (selected) {
        setTimeout(() => {
          const filtered = todos.filter((item) => item.id !== selected);
          setTodos(filtered);
        }, 3333);
      }
    }, [selected]);

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Tarefas
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">de hoje</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList boxShadow="rgba(0,0,0,0.1) 0 0 10px" bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +7 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +30 dias
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          {tarefa && (
            <Flex flexDir="column" justify="space-between">
              {todos.map((todo, i) => {
                return (
                  <Flex
                    onClick={() => {
                      setSelected(todo.id);
                    }}
                    py="4"
                    align="center"
                    justify="space-between"
                    borderBottom={i !== todos.length - 1 && "1px solid #eee"}
                    pb={i !== todos.length - 1 && "3"}
                  >
                    <Text color="#333">{todo.title}</Text>
                    <Flex
                      align="center"
                      justify="center"
                      bg={darkMode ? "#333" : "#eee"}
                      cursor="pointer"
                      style={{ height: 25, width: 25 }}
                      borderRadius="5"
                    >
                      {selected === todo.id && <Text fontSize="25">✅</Text>}
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          )}
          <Flex
            onClick={() => setTarefa(!tarefa)}
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt={tarefa ? "5" : "0"}
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Adicionar tarefa
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Projects() {
    const projetos = [
      {
        status: "pause",
        name: "eudigonao",
        username: "@eudigonao",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/eudignao",
        team: ["Rhuan Marques"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "pra hoje",
        timestamp: "1h",
      },
      {
        status: "pause",
        name: "Financial Co",
        username: "@financial.company",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/financial-next",
        team: ["Lucas F. Fleury"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "1st july",
        timestamp: "1h",
      },
      {
        status: "dev",
        name: "Inconformedia",
        username: "@inconformedia",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/financial-next",
        team: ["Alice"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "t/weekend",
        timestamp: "1h",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Projetos
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList boxShadow="rgba(0,0,0,0.1) 0 0 10px" bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex flexDir="column" justify="space-between">
            {projetos.map((projeto, i) => {
              return (
                <Flex
                  align="center"
                  pt={i !== 0 && "3"}
                  justify="space-between"
                  borderBottom={i !== projetos.length - 1 && "1px solid #eee"}
                  pb={i !== projetos.length - 1 && "3"}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Flex align="center" w="100%">
                      <Image
                        borderRadius="5"
                        src={projeto.avatar}
                        style={{ height: 60, width: 60 }}
                        mr="2"
                      />
                      <Flex flexDir="column" w="100%">
                        <Flex flexDir="column" w="100%">
                          <Flex justify="space-between" w="100%" align="center">
                            <Text color="#000" fontWeight="bold" fontSize="md">
                              {projeto.name}
                            </Text>
                            <Flex align="center">
                              <Flex
                                bg={darkMode ? "#333" : "#eee"}
                                borderRadius="full"
                                py="0.5"
                                px="4"
                              >
                                <Text fontSize="sm" color="#333">
                                  {projeto.status}
                                </Text>
                              </Flex>
                              <Icon
                                ml="2"
                                as={RiShareLine}
                                color="#333"
                                fontSize="sm"
                              />
                            </Flex>
                          </Flex>
                          <Text color="#333" fontSize="xs">
                            {projeto.repository}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Text color="#555" fontSize="sm"></Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todos os projetos
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function ContentCard() {
    return (
      <Flex
        mx={size.width < 1200 && "auto"}
        mt="5"
        px={size.width > 1200 ? "6" : size.width < 700 ? "6" : null}
        borderRadius="5"
        style={{
          maxWidth: size.width > 1200 ? 450 : 900,
          width: "100%",
          height: 300,
        }}
        boxShadow="rgba(100,100,100,0.1) 0 0 10px"
        bg={darkMode ? "#3A3A3A" : "transparent"}
        p="6"
        justify="space-between"
        align="center"
      ></Flex>
    );
  }

  function Content() {
    return (
      <Flex
        style={{
          maxWidth: size.width > 1200 ? 450 : 900,
          width: "100%",
        }}
        px="auto"
        mx={size.width < 1200 && "auto"}
        mt={size.width < 1200 && "6"}
        flexDir="column"
        justify="center"
        align="center"
        pr="10"
      >
        <Flex flexDir="column" w="100%">
          <Text
            color={darkMode ? "#FFF" : "#000"}
            w="100%"
            textAlign="left"
            fontWeight="medium"
            fontSize={size.width < 1000 ? "2xl" :"4xl"}
            maxW={900}
          >
            Acesso a educação a distância para todos.
          </Text>
        </Flex>
        <Text
          color={darkMode ? "#FFF" : "#000"}
          w="100%"
          fontWeight="thin"
          textAlign="left"
          fontSize="lg"
          maxW={900}
        >
          Com nossos serviços de criação de cursos com módulos e aulas
          personalizadas você consegue além de fazer disso uma fonte de renda
          compartilhar conhecimento.
        </Text>
      </Flex>
    );
  }

  function Search() {
    return (
      <Flex
        mt="3"
        style={{
          height: 60,
          width: "100%",
        }}
        bg="#e0e0e0"
        align="center"
        pl="4"
        borderRadius="5"
      >
        <Icon as={RiSearch2Line} color="#b0b0b0" fontSize="22" />
        <Input
          onChange={(e) => {
            if (e.target.value !== "") {
              setSearchResults(!searchResults);
            }
          }}
          color="#333"
          _focus={{
            border: "0px solid #0069F6",
          }}
          placeholder="Pesquisar"
          style={{
            height: 50,
            width: "100%",
          }}
          border="0px solid transparent"
          borderRadius="5"
          bg="#e0e0e0"
        />
      </Flex>
    );
  }

  // if (!user) {
  //   return (
  //     <Flex justify="center" align="center" h="100vh" w="100vw">
  //       <Spinner size="xl" color="#42ba96" />
  //     </Flex>
  //   );
  // }

  function Greeting() {
    return (
      <>
        <Flex align="center" justify="space-between">
          <Flex flexDir="column">
            <Text mt="5" color="#333" fontSize="md">
              Boa noite
            </Text>
            <Text color="#000" fontWeight="bold" fontSize="3xl">
              Ricardo
            </Text>
          </Flex>
          <Text fontSize="4xl" mt="4" ml="4">
            👋
          </Text>
        </Flex>
      </>
    );
  }

  if (!user) {
    return (
      <Flex
        flexDir="column"
        bg={darkMode ? "#333" : "#eee"}
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
      >
        <Spinner color="#333" size="xl" />
        <Text color="#333" mt="4" fontSize="xl">
          Aguarde enquanto carregamos seu conteúdo
        </Text>
      </Flex>
    );
  }

  function Sidebar() {
    function Item({ title, icon, color }) {
      return (
        <Flex
          onClick={() => {
            if(title === "Dashboard") {
              router.push("/dashboard")
            } else if (title === "Accounts") {
              router.push("/accounts")
            } else if (title === "Courses") {
              router.push("/courses")
            } else if (title === "Projects") {
              router.push("/projects")
            } else if (title === "Discounts") {
              router.push("/discounts")
            } else {
              onOpen()
            }
          }}
          onMouseOver={() => {
            setOver(title);
          }}
          _hover={{
            cursor: "pointer",
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
          p="4"
          mb="4"
          w={over === title && 150}
          bg={darkMode ? "#222" : "#fff"}
          boxShadow="rgba(0,0,0,0.1) 0 0 10px"
          justify="space-between"
          px={over === title && "6"}
          align="center"
          borderRadius="5"
          fontSize="xs"
          color={darkMode ? "#FFF" : "#333"}
        >
          <Icon
            as={icon}
            color={color}
            fontSize="lg"
            mr={over === title && "4"}
          />
          {over === title && title}
        </Flex>
      );
    }

    return (
      <Flex
        flexDir="column"
        justify="space-between"
        px="4"       
           pb="4"

        boxShadow="rgba(0,0,0,0.03) 0 0 10px"
        position="fixed"
        style={{
          paddingTop: 90,
          width: 80,
          height: size.height,
        }}
      >
        <Flex flexDir="column" justify="space-between" h="100%">
          <Flex flexDir="column">
            <Item
              title="Dashboard"
              icon={MdDashboardCustomize}
              color="#0f9aff"
            />
            <Item title="Accounts" icon={MdManageAccounts} color="#f60ffb" />
            <Item title="Courses" icon={MdLibraryBooks} color="#f55556" />
            <Item title="Projects" icon={RiPagesFill} color="#744cc6" />
            <Item title="Whatsapp" icon={RiWhatsappFill} color="#25d366" />
            <Item title="Messenger" icon={RiMessengerFill} color="#006AFF" />
            <Item title="Twilio" icon={RiPriceTagFill} color="#f10568" />
          </Flex>
          <Item
            title="Configurações"
            icon={MdSettings}
            color={darkMode ? "#AAA" : "#333"}
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Sidebar />
      <TopNav />

      <Flex
        onMouseOver={() => {
          setOver("");
        }}
        flexDir="column"
        bg={darkMode ? "#333" : "#eee"}
        h="100vh"
        style={{
          paddingLeft: 80,
        }}
      >
        <Flex
          flexDir="column"
          p="4"
          style={{
            paddingTop: 70,
          }}
        >
          {size.width < 1200 ? (
            <>
              <ContentCard />
              <Content />
            </>
          ) : (
            <>
              <Flex w="100%" justify="center" mt="4" align="center">
                <Content />
                <ContentCard />
              </Flex>
            </>
          )}
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={() => {
            onClose();
            setPublicacao(false);
            setCurso(false);
            setProduto(false);
          }}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            height={size.height - 80}
            bg={darkMode ? "#333" : "#eee"}
            borderTopLeftRadius="10"
            borderTopRightRadius="10"
          >
            <DrawerHeader
              bg="#FFF"
              justifyContent="space-between"
              borderTopLeftRadius="10"
              borderTopRightRadius="10"
              py="6"
              px="4"
              w="100%"
              alignItems="center"
              borderBottom="1px solid #e0e0e0"
            >
              <Flex align="center">
                <Icon as={MdSettings} color="#333" fontSize="xl" />
                <Text ml="2" color="#333" fontSize="xl">
                  Configurações
                </Text>
              </Flex>
              <DrawerCloseButton
                size="lg"
                _focus={{
                  boxShadow: "none",
                }}
                color="#333"
              />
            </DrawerHeader>

            <DrawerBody>
              <Flex flexDir={isWideVersion ? "row" : "column"} mt="4">
                <Flex
                  style={{
                    width: isWideVersion ? 200 : "100%",
                  }}
                  borderRadius="5"
                  bg={isWideVersion && "#FFF"}
                  p={isWideVersion ? "6" : "2"}
                  flexDir="column"
                >
                  <Flex
                    flexDir="column"
                    borderBottom={
                      isWideVersion ? "1px solid #f0f0f0" : "1px solid #e0e0e0"
                    }
                    pb="4"
                  >
                    <Text color="#333" fontSize="lg">
                      {user &&
                        user.name.split(" ")[0] +
                          " " +
                          user.name.split(" ")[user.name.split(" ").length - 1]}
                    </Text>
                    <Flex align="center" cursor="pointer">
                      <Text color="#1f5199" fontSize="md">
                        uppernodes.com
                      </Text>
                      <Icon
                        ml="1"
                        as={FiExternalLink}
                        color="#1f5199"
                        fontSize="md"
                      />
                    </Flex>
                  </Flex>

                  {isWideVersion && (
                    <Flex mt="4">
                      <Flex
                        _hover={{
                          backgroundColor: "#ccc",
                        }}
                        cursor="pointer"
                        w="100%"
                        bg={darkMode ? "#333" : "#eee"}
                        borderRadius="5"
                        px="4"
                        py="2"
                        justify="center"
                        align="center"
                        color="#333"
                      >
                        <Icon as={MdStore} color="#333" fontSize="md" mr="2" />
                        <Text ml="2" color="#333">
                          Realizar
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
                <Flex
                  mt={!isWideVersion && "4"}
                  ml={isWideVersion && "4"}
                  style={{
                    width: "100%",
                  }}
                  bg={!isWideVersion && "#FFF"}
                  borderRadius="5"
                  p="4"
                  flexDir="column"
                >
                  <Flex
                    pb={!isWideVersion && "4"}
                    borderBottom={
                      isWideVersion ? "1px solid #f0f0f0" : "1px solid #f0f0f0"
                    }
                  >
                    <Text
                      color="#333"
                      fontSize={isWideVersion ? "2xl" : "lg"}
                      fontWeight="bold"
                    >
                      Informações da conta
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}
