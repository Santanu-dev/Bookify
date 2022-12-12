import { API } from "../../Backend";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefind") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefind") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
    .then(response => {
      console.log("user logged out");
    })
    .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
    if (typeof window == "undefind") {
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}
