import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router, { useRouter } from "next/router";
import { api } from "../services/apiClient";

import { BroadcastChannel } from "broadcast-channel";
import jwtDecode from "jwt-decode";
import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import Loading from "../components/Loading";

type User = {
  _id: string;
  avatar?: string;
  name: string;
  email: string;
  permissions?: string[];
  roles?: string[];
  utils?: {
    darkMode: boolean;
  };
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  status?: string;
  message?: string;
  error?: boolean;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  status?: string;
  message?: string;
  error?: string;
};

type TUpdate = {
  id: string;
  param: string;
  value: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<SignUpResponse>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  updateName: (values: TUpdate) => Promise<any>;
  darkMode: boolean;
  setDarkMode: (value: boolean) => Promise<any>;
  handleSetDarkMode: (value: boolean) => any;
  loading: boolean;
  setLoading: (value: boolean) => any;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const Context = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  // Router.push("/");
}

export function ContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (!token) {
      if (router.pathname === "/auth/signin") {
        //
      } else if (router.pathname === "/auth/signup") {
        //
      } else {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } else if (token) {
      // Verify if token is valid
      // Verify _id permissions and roles 2Check

      const decoded: User = jwtDecode(token);

      // key manager res.data verificar tudo aqui
      api.get(`/auth/user/${decoded._id}`).then((res) => {
        if (!res.data) {
          destroyCookie(undefined, "nextauth.token");
          destroyCookie(undefined, "nextauth.refreshToken");
          router.push("/");
        } else {
          setUser(res.data);
        }
      });

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/auth/sessions", {
        email: email,
        password: password,
      });

      const { _id, name, token, refreshToken, permissions, roles } =
        response.data;

      if (response.data.error) {
        return response.data;
      } else {
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
        setCookie(undefined, "nextauth.refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        setUser({
          _id,
          name,
          email,
          permissions,
          roles,
        });

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        Router.push("/admin");

        setLoading(false);

        return {
          status: "Sucesso!",
          message: "Usuario autenticado com sucesso",
        };
      }
    } catch (error) {
      return { status: "Erro!", error: "Tente novamente mais tarde" };
    }
  }

  async function signUp({
    name,
    email,
    password,
  }: SignUpCredentials): Promise<SignUpResponse> {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "Usuário criado com sucesso!") {
        const response = await api.post("/auth/sessions", {
          email: email,
          password: password,
        });

        const { _id, name, token, refreshToken, permissions, roles } =
          response.data;

        if (response.data.error) {
          return response.data.message;
        } else {
          setCookie(undefined, "nextauth.token", token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });
          setCookie(undefined, "nextauth.refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });

          setUser({
            _id,
            name,
            email,
            permissions,
            roles,
          });

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          Router.push("/admin");

          setLoading(false);

          return {
            status: "Sucesso!",
            message: "Usuario autenticado com sucesso",
          };
        }
      } else {
        if (response.data.status === "Erro!") {
          return response.data;
        } else {
          return { status: "Erro!", error: "Dados invalidos" };
        }
      }
    } catch (error) {
      return { status: "Erro!", error: "Tente novamente mais tarde" };
    }
  }

  async function updateName({ id, param, value }: TUpdate) {
    try {
      const response: AxiosResponse = await api.put(
        `/auth/update/${id}/${param}/${value}`
      );

      if (response.data.Message === "Atualizado com sucesso") {
        console.log(response.data);
        setUser(response.data.user);
      } else {
        console.log(2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");

    setUser(null);

    authChannel.postMessage("signOut");

    setLoading(false);
    handleSetDarkMode(false);
    Router.push("/");
  }

  const [darkMode, handleSetDarkMode] = useState(false);

  useEffect(() => {
    isDarkMode();

    if (user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user, darkMode]);

  async function setDarkMode(value: boolean) {
    return new Promise((resolve, reject) => {
      if (value === true) {
        api.post(`/user/darkmode/${user._id}/true`).then((res) => {
          handleSetDarkMode(true);
        });
        resolve("Dark.Mode is now true");
      } else if (value === false) {
        api.post(`/user/darkmode/${user._id}/false`).then((res) => {
          handleSetDarkMode(false);
        });
        resolve("Dark.Mode is now false");
      } else {
        reject("Valor invalido");
      }
    });
  }

  async function isDarkMode() {
    return new Promise((resolve, reject) => {
      if (user && user._id) {
        api.get(`/user/darkmode/${user._id}`).then((res) => {
          if (res.data === true) {
            handleSetDarkMode(true);
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          } else if (res.data === false) {
            handleSetDarkMode(false);
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          } else {
            reject("Valor invalido");
          }
        });
      }
    });
  }

  if (darkMode) {
    return (
      <Context.Provider
        value={{
          signIn,
          signUp,
          signOut,
          updateName,
          isAuthenticated,
          user,
          darkMode,
          setDarkMode,
          handleSetDarkMode,
          loading,
          setLoading
        }}
      >
        {children}
        <style jsx global>{`
          html {
            background-color: #333;
          }
        `}</style>
      </Context.Provider>
    );
  } else {
    return (
      <Context.Provider
        value={{
          signIn,
          signUp,
          signOut,
          updateName,
          isAuthenticated,
          user,
          darkMode,
          setDarkMode,
          handleSetDarkMode,
          loading,
          setLoading
        }}
      >
        {children}
        <style jsx global>{`
          html {
            background-color: #eee;
          }
        `}</style>
      </Context.Provider>
    );
  }
}
