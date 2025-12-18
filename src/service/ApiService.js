import axios from "axios";
import MessageService from "./MessageService";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getToken = () => {
  const userData = localStorage.getItem("@info3web/userPayload/token");

  if (userData) {
    const parsedData = JSON.parse(userData);
    return parsedData.token;
  }
  return null;
};

const clearToken = () => {
  localStorage.removeItem("@info3web/userPayload/token")
  window.location.href = "/"
}

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    const status = error.response?.status;
    const detail = error.response?.data?.detail;

    if (status === 500) {
      MessageService.error("⚠ Erro interno do servidor", detail);
      console.error(
        "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde."
      );
    } 
    else if (status === 404) {
      MessageService.error("Recurso não encontrado", detail);
      console.error(
        "Recurso não encontrado. Verifique a URL e tente novamente."
      );
    } 
    else if (status === 400) {
      MessageService.error("Dados inválidos", detail);
      console.error("Requisição inválida. Verifique os dados enviados.");
    } 
    else if (status === 401) {
      MessageService.error("Sessão expirada", detail);
      //clearToken();
      console.error("Não autorizado. Verifique suas credenciais.");
    } 
    else if (status === 403) {
      MessageService.error("Acesso não permitido", detail);
      console.error(
        "Acesso proibido. Você não tem permissão para acessar este recurso."
      );
    } 
    else {
      MessageService.error("Falha de conexão com o servidor", detail);
      console.error("Ocorreu um erro desconhecido: ", error.message);
    }

    return Promise.reject(error);
  }
);

class ApiService {
  get(url) {
    return instance.get(url);
  }
  post(url, data) {
    return instance.post(url, data);
  }

  postFile(url, data) {
    return instance.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }

  patch(url, data) {
    return instance.patch(url, data);
  }

  delete(url) {
    return instance.delete(url);
  }
}

export default new ApiService();
