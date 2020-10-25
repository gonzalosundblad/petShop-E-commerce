import axios from "axios";

const API_URL = "http://localhost:3001/auth/login";
// const API_URL2 = "http://localhost:3001/auth/me";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL, { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  // authMe() {
  //   return axios
  //     .get(API_URL2)
  //     .then(resp => {
  //       if (resp.data.user) {
  //         localStorage.setItem("user", JSON.stringify(resp.data.user))
  //       }
  //     })
  // }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL, {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
