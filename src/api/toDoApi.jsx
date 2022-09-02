import axios from "axios";

const toDoApi = axios.create({
  baseURL: "http://localhost:3000"
});

export const getToDos = async () => {
  const response = await toDoApi.get("/todos");
  return response.data;
};

export const addToDo = async (todo) => {
  return await toDoApi.post("/todos", todo);
};

export const updateToDo = async (todo) => {
  return await toDoApi.patch(`/todos${todo.id}`, todo);
};

export const deleteToDo = async ({ id }) => {
  return await toDoApi.delete(`/todos/${id}`, id);
};

export default toDoApi;
