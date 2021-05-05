import axios from ".";
import { TodoType } from "../../typescript/todo";

interface AddTodoAPIBody {
  text: string;
  color: string;
}

//* 투두 리스트 불러오기 API
export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);
export const addTodoAPI = (body: AddTodoAPIBody) =>
  axios.post("api/todos", body);
export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`);
