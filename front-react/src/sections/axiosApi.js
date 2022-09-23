import axios from "axios";
// import jwt_decode from "jwt-decode";

// const mode = import.meta.env.VITE_RUN_ENV || "dev";
const baseUrl = process.env.REACT_APP_API_URI ;


const axiosApi = (service) => {

  // token 설정
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    axios.defaults.headers.Authorization = `Bearer ${user.token}`;
  } else {
    axios.defaults.headers.Authorization = '';
  }

  if (baseUrl.indexOf("local:") >= 0 && baseUrl.indexOf("8088") < 0 )
    axios.defaults.baseURL = baseUrl;
  else
    axios.defaults.baseURL = baseUrl + ((service) ? `/${  service}` : "");
  console.log("axios baseURL : ", axios.defaults.baseURL);

  console.log("axios got ready in ", service);
  return axios.create();
}

const setHeaders = (jwt) => {
    // token 설정
    console.log("jwt ... ", jwt)
    axios.defaults.headers.Authorization = `Bearer ${jwt}`;

    // userId 설정
    // headers['userId'] = getUserId(jwt);
}

const getUserId = (jwt) => {
  // if (!jwt) return "";
  // const decoded = jwt_decode(jwt);
  // return decoded.userId;
}

export default axiosApi;
