import {
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useContext } from "react";
import { BiChevronDown, BiListPlus, BiUserPlus } from "react-icons/bi";
import { RiAlertLine, RiCloseFill, RiInformationLine } from "react-icons/ri";
import NumberFormat from "react-number-format";
import TopNav from "../../../components/TopNav";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/apiClient";

export default function Curso() {
  const { user } = useContext(AuthContext);

  type Course = {
    _id: string;
    content: object;
    keywords: [string];
    models: [string];
    topics: [string];
  };

  const [course, setCourse] = useState<Course>();
  const [courseId, setCourseId] = useState("");
  const [courseInitialized, setCourseInitialized] = useState(false);
  const [courseCreated, setCourseCreated] = useState(false);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [modelos, setModelos] = useState([]);

  async function fetchModels() {
    if (courseId) {
      let id = courseId;
      await api.get(`/content/models/course/${courseId}`).then((res) => {
        setModelos(res.data);
      });
    }
  }

  const handleInitCurso = function () {
    type PromiseReturn = {
      data: Course;
      statis: string;
    };
    return new Promise<PromiseReturn>(async function (resolve, reject) {
      if (!user) {
        reject("Usuario nao encontrado");
      } else {
        const response = await api.post("/content/course", {
          creator: {
            _id: user && user._id,
          },
        });

        if (response.data.status === "Curso adicionado com sucesso!") {
          resolve(response.data);
        } else {
          reject("Tente novamente mais tarde");
          toast({
            status: "error",
            description: "Tente novamente mais tarde",
          });
        }
      }
    });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [palavrasChave, setPalavrasChave] = useState([]);

  const toast = useToast();

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateCurso = function () {
    if (!name) {
      toast({
        duration: 1000,
        status: "error",
        position: "top-end",
        description: "O seu curso precisa de um nome",
      });
    } else if (modelos.length < 1) {
      toast({
        duration: 1000,
        status: "error",
        position: "top-end",
        description: "O seu curso precisa de ao menos um modelo de subscrição",
      });
    } else {
      api
        .put(`/content/course/create/${courseId}`, {
          creator: {
            _id: user._id,
          },
          name,
          description,
          category,
          keywords: palavrasChave,
          models: modelos,
        })
        .then((res) => {
          if (res.data.status === "Curso atualizado com sucesso!") {
            toast({
              duration: 500,
              status: "success",
              description: res.data.status,
            });
            setTimeout(() => {
              router.push(`/create/curso/${courseId}`);
            }, 1000);
          } else {
            toast({
              duration: 500,
              status: "error",
              description: "Tente novamente mais tarde",
            });
          }
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

  function Model() {
    const [number, setNumber] = useState("");
    const [selected, setSelected] = useState("Gratuito");
    const [type, setType] = useState<"Free" | "Paid">("Free");
    const [method, setMethod] = useState<
      "Diario" | "Semanal" | "Mensal" | "Anual" | "Permanente"
    >("Diario");

    const [name, setName] = useState("");
    const [value, setValue] = useState(undefined);

    const inputRef = useRef<HTMLInputElement>();
    const valueRef = useRef<HTMLInputElement>();

    async function handleCreateModelo() {
      if (!name) {
        toast({
          duration: 500,
          position: "top-end",
          status: "error",
          description: "O modelo precisa de um nome",
        });
      } else if (type === "Paid") {
        if (!value) {
          toast({
            duration: 500,

            position: "top-end",
            status: "error",
            description: "Qual o valor?",
          });
        } else {
          api
            .post("/content/model", {
              creator: {
                _id: user._id,
              },
              course: {
                _id: courseId,
              },
              name,
              type,
              method:
                method === "Diario"
                  ? "Daily"
                  : method === "Semanal"
                  ? "Weekly"
                  : method === "Mensal"
                  ? "Monthly"
                  : method === "Anual"
                  ? "Yearly"
                  : method === "Permanente"
                  ? "Permanent"
                  : null,
              value,
            })
            .then((res) => {
              inputRef.current.value = "";
              valueRef.current.value = "";
              setName("");
              setValue("");
              if (res.data.status === "Modelo adicionado com sucesso!") {
                fetchModels();
                toast({
                  duration: 500,
                  position: "top-end",
                  status: "success",
                  description: "Modelo adicionado com sucesso",
                });
              } else {
                toast({
                  duration: 500,
                  position: "top-end",
                  status: "error",
                  description: "Tente novamente mais tarde",
                });
              }
            });
        }
      } else {
        inputRef.current.value = "";
        api
          .post("/content/model", {
            creator: {
              _id: user._id,
            },
            course: {
              _id: courseId,
            },
            name,
            type,
            method:
              method === "Diario"
                ? "Daily"
                : method === "Semanal"
                ? "Weekly"
                : method === "Mensal"
                ? "Monthly"
                : method === "Anual"
                ? "Yearly"
                : method === "Permanente"
                ? "Permanent"
                : null,
            value,
          })
          .then((res) => {
            if (res.data.status === "Modelo adicionado com sucesso!") {
              fetchModels();
              toast({
                duration: 500,
                position: "top-end",
                status: "success",
                description: "Modelo adicionado com sucesso",
              });
            } else {
              toast({
                duration: 500,
                position: "top-end",
                status: "error",
                description: "Tente novamente mais tarde",
              });
            }
          });
      }
    }

    const handleDeleteModel = function (id) {
      return new Promise(async function (resolve, reject) {
        if (id) {
          const response = await api.delete(`/content/model/${id}`);
          if (response.data.message === "Modelo deletado com sucesso!") {
            resolve(response.data.message);
            toast({
              duration: 500,
              position: "top-end",
              status: "success",
              description: response.data.message,
            });
          } else {
            toast({
              duration: 500,
              position: "top-end",
              status: "error",
              description: response.data.message,
            });
          }
        } else {
          reject(Error("Not able to delete model"));
        }
      });
    };

    function Item({ title, value }) {
      return (
        <Flex
          cursor="pointer"
          mt="2"
          align="center"
          onClick={() => {
            if (title === "Pago") {
              setType("Paid");
            } else if (title === "Gratuito") {
              setType("Free");
            }
          }}
        >
          <Flex
            border="2px solid #000"
            style={{ width: 25, height: 25, borderRadius: 25 }}
            justify="center"
            align="center"
          >
            {type === value && (
              <Flex
                style={{ height: 15, width: 15 }}
                bg="#000"
                borderRadius="full"
              />
            )}
          </Flex>
          <Text color="#000" ml="2" fontSize="sm" fontWeight="bold">
            {title}
          </Text>
        </Flex>
      );
    }

    return (
      <Flex flexDir="column" pt="4">
        <Flex justify="space-between" w="100%">
          <Flex flexDir="column">
            <Text color="#000" fontSize="lg" fontWeight="bold">
              Adicionar modelos de subscrição
            </Text>
            <Text color="#000" fontSize="sm" mb="4">
              Adicione um nome e selecione o modelo de cobrança
            </Text>
          </Flex>
        </Flex>
        <Flex
          mb={modelos.length > 0 && "4"}
          overflowX="scroll"
          pb={modelos.length > 5 && "4"}
        >
          {modelos.map((p, i) => {
            return (
              <Flex
                flexDir="row"
                key={i}
                borderRadius="5"
                bg="#222"
                mr="2"
                p="4"
                justify="center"
                align="center"
              >
                <Flex w="100%" justify="space-between" align="center">
                  <Flex flexDir="column">
                    <Text color="#fff" fontSize="md">
                      {p.name}
                    </Text>
                    <Text color="#fff" fontSize="xs">
                      {p.type}
                    </Text>
                    <Text color="#fff" fontSize="xs">
                      {p.method}
                    </Text>
                    <Text color="#fff" fontSize="xs">
                      {p.value > 0 ? `R$${p.value}` : "Gratuito"}
                    </Text>
                  </Flex>
                  <Icon
                    onClick={() => {
                      handleDeleteModel(p._id).then(() => {
                        fetchModels();
                      });
                    }}
                    cursor="pointer"
                    as={RiCloseFill}
                    ml="4"
                    color="#FFF"
                  />
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Input
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          mb="4"
          placeholder="Nome do modelo"
          color="#000"
          style={{ width: 200 }}
        />
        <Item title="Gratuito" value="Free" />
        <Item title="Pago" value="Paid" />
        {type === "Paid" && (
          <Flex mt="4">
            <Flex flexDir="column" mr="2">
              <Text color="#000" fontWeight="bold">
                Valor
              </Text>
              <NumberFormat
                style={{
                  width: 150,
                  height: 40,
                  borderRadius: 5,
                  border: "2px solid #e0e0e0",
                  fontSize: 18,
                  color: "#000",
                }}
                getInputRef={valueRef}
                prefix={"R$"}
                mask=""
                maxLength={6}
                name="phoneNumberInput"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const number = e.target.value.split("R$")[1];
                  setValue(Number(number));
                }}
                value={value}
              />
            </Flex>
            <Flex flexDir="column">
              <Text color="#000" fontWeight="bold">
                Metodo
              </Text>
              <Menu>
                <MenuButton
                  bg="#eee"
                  style={{ height: 40, width: 200 }}
                  borderRadius="5"
                  px="3"
                >
                  <Flex align="center" justify="space-between">
                    <Text fontSize="md" cursor="pointer" color="#000">
                      {method}
                    </Text>
                    <Icon
                      ml="2"
                      as={BiChevronDown}
                      color="#000"
                      fontSize="14"
                    />
                  </Flex>
                </MenuButton>
                <MenuList zIndex="2" bg="#eee" py="0">
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      setMethod("Semanal");
                    }}
                    color="#000"
                    fontSize="sm"
                  >
                    Diario
                  </MenuItem>
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      setMethod("Semanal");
                    }}
                    color="#000"
                    fontSize="sm"
                  >
                    Semanal
                  </MenuItem>
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      setMethod("Mensal");
                    }}
                    color="#000"
                    fontSize="sm"
                  >
                    Mensal
                  </MenuItem>
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      setMethod("Anual");
                    }}
                    color="#000"
                    fontSize="sm"
                  >
                    Anual
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        )}
        <Flex
          onClick={() => {
            handleCreateModelo();
          }}
          _hover={{
            opacity: 0.9,
          }}
          cursor="pointer"
          mt="4"
          justify="center"
          align="center"
          bg="#000"
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#FFF",
            width: 200,
            height: 40,
          }}
          borderRadius="5"
        >
          Adicionar modelo
        </Flex>
      </Flex>
    );
  }

  function Categoria() {
    function Item({ title }) {
      return (
        <Flex
          cursor="pointer"
          onClick={() => setCategory(title)}
          mr="2"
          borderRadius="5"
          style={{ height: 40 }}
          px="4"
          justify="center"
          align="center"
          bg={category === title ? "#000" : "#222"}
        >
          <Text color="#FFF" fontSize={size.width > 600 ? "sm" : "xs"}>
            {title}
          </Text>
        </Flex>
      );
    }

    return (
      <>
        <Text mt="4" color="#000" fontWeight="bold">
          Categoria
        </Text>

        <Flex mt="2">
          <Item title="Marketing Digital" />
          <Item title="Programacao" />
          <Item title="Financas" />
        </Flex>
      </>
    );
  }

  function PalavrasChave() {
    const [palavraChave, setPalavraChave] = useState("");
    const inputRef = useRef();

    return (
      <>
        <Text mt="4" color="#000" fontWeight="bold">
          Palavras-chaves
        </Text>
        <Flex mt={palavrasChave.length > 0 && "4"}>
          {palavrasChave.map((p, i) => {
            return (
              <Flex
                key={i}
                borderRadius="5"
                bg="#222"
                mr="2"
                style={{ height: 40 }}
                px="4"
                justify="center"
                align="center"
              >
                <Text color="#fff">{p}</Text>
                <Icon
                  onClick={() => {
                    const filter = palavrasChave.filter((pa) => pa !== p);
                    setTimeout(() => {
                      setPalavrasChave(filter);
                    }, 111);
                  }}
                  cursor="pointer"
                  as={RiCloseFill}
                  ml="4"
                  color="#FFF"
                />
              </Flex>
            );
          })}
        </Flex>
        <Input
          mt="4"
          color="#333"
          style={{
            border: "2px solid #e0e0e0",
            height: 40,
            width: 200,
          }}
          ref={inputRef}
          value={palavraChave}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPalavraChave(e.target.value);
          }}
          placeholder="Insira uma palavra-chave"
        />
        <Flex
          cursor="pointer"
          onClick={(e) => {
            if (palavraChave === "") {
              toast({
                status: "error",
                description: "Voce precisa inserir o valor",
                duration: 500,
              });
            } else {
              setPalavrasChave([...palavrasChave, palavraChave]);
            }
          }}
          mt="4"
          style={{
            height: 40,
            width: 200,
          }}
          bg="#000"
          borderRadius="5"
          justify="center"
          align="center"
        >
          <Text color="#FFF" fontSize="14" fontWeight="bold">
            Adicionar
          </Text>
        </Flex>
      </>
    );
  }

  if (!user) {
    return (
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Spinner color="#333" size="lg" />
      </Flex>
    );
  }

  return (
    <Flex flexDir="column">
      <TopNav />

      <Flex
        maxW={1000}
        mx="auto"
        flexDir="column"
        style={{ marginTop: 80 }}
        w="100vw"
        p="4"
      >
        <Text
          color="#000"
          fontWeight="bold"
          fontFamily="sans-serif"
          fontSize="4xl"
        >
          Criar um novo curso
        </Text>
        <Text color="#000" fontFamily="sans-serif" fontSize="xs">
          Um curso e formado por modulos, que por sua vez sao formados por audio
          video e texto.
        </Text>

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />

        <Flex w="100vw" maxW={size.width - 50} mt="4">
          <Flex flexDir="column">
            <Text color="#000" fontWeight="bold">
              Nome do curso
            </Text>
            <Input
              onFocus={() => {
                if (!courseInitialized) {
                  handleInitCurso().then((res) => {
                    setCourseId(res.data._id);
                    setCourse(res.data);
                    setCourseInitialized(true);
                    setLoading(false);
                  });
                }
              }}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              placeholder=""
              color="#000"
              style={{ maxWidth: 400, width: size.width - 50 }}
            />
          </Flex>
        </Flex>

        <Flex flexDir="column" mt="4">
          <Text color="#000" fontWeight="bold">
            Descricao (opcional)
          </Text>
          <Input
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            placeholder=""
            color="#000"
            style={{ maxWidth: 400, width: size.width - 50 }}
          />
        </Flex>

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />

        <Categoria />

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />
        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="4" />

        <PalavrasChave />

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />

        <Model />

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />

        <Flex align="center" mt="6">
          <Icon as={RiInformationLine} color="#333" fontSize="md" />
          <Text color="#333" fontSize="md" ml="2">
            Você está criando um curso publico
          </Text>
        </Flex>

        <Flex w="100%" style={{ height: 1 }} bg="#f5f5f5" mt="6" />

        <Flex mt="4">
          <Flex
            onClick={() => {
              handleCreateCurso();
            }}
            justify="center"
            align="center"
            cursor="pointer"
            bg="#000"
            borderRadius="5"
            style={{
              height: 55,
              width: "100%",
            }}
          >
            <Text color="#FFF" fontWeight="bold">
              Adicionar curso
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#333">{name}</ModalHeader>
          <ModalBody>
            {description && (
              <Text color="#333" fontWeight="bold" mb="1rem">
                {description}
              </Text>
            )}

            {category && (
              <Text color="#333" fontWeight="bold" mb="1rem">
                {category}
              </Text>
            )}

            {palavrasChave &&
              palavrasChave.map((p, i) => {
                return (
                  <Text key={i} color="#333" fontWeight="bold" mb="1rem">
                    {p}
                  </Text>
                );
              })}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
