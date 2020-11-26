import fetch from "isomorphic-fetch";
import { Env } from "env";

export const apiUrl = Env.API_URL;

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export const parseJSON = (response) => {
  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};

export const get = (url, params = null) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["X-Token"] = authToken;
  }

  url = new URL(apiUrl + url);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const post = (url, params = {}) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["X-Token"] = authToken;
  }

  return fetch(apiUrl + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const put = (url, params = {}) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["X-Token"] = authToken;
  }

  return fetch(apiUrl + url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(params),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const patch = (url, param = {}) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["X-Token"] = authToken;
  }

  return fetch(apiUrl + url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(param),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const del = (url, param = {}) => {
  const authToken = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["X-Token"] = authToken;
  }

  return fetch(apiUrl + url, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(param),
  })
    .then(checkStatus)
    .then(parseJSON);
};
