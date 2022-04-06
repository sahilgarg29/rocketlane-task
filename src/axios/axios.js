import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/karthick03/json-db-data/tasks",
});

export default instance;
