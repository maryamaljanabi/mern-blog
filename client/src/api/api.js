import Axios from "axios";
const axiosConfig = {
  baseURL: `http://${window.location.hostname}:5000/api`,
};

const axios = Axios.create(axiosConfig);

// USERS
export const usersAPI = {
  getAll: () => axios.get(`/users`),
  getOne: (id) => axios.get(`/users/${id}`),
  add: (data) => axios.post(`/users`, data),
  update: (data) => axios.put(`/users`, data),
  delete: (id) => axios.delete(`/users/${id}`),
};

// POSTS
export const postsAPI = {
  getAll: () => axios.get(`/posts`),
  getOne: (id) => axios.get(`/posts/${id}`),
  add: (data) => axios.post(`/posts`, data),
  update: (data) => axios.put(`/posts`, data),
  delete: (id) => axios.delete(`/posts/${id}`),
};
