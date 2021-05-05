import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../typescript/todo";

import { getTodosAPI } from "../lib/api/todo";

// const todos: TodoType[] = [
//   {
//     id: 1,
//     text: "채용 공고 정리",
//     color: "red",
//     checked: false,
//   },
//   {
//     id: 2,
//     text: "Next.js 공부",
//     color: "orange",
//     checked: true,
//   },
//   {
//     id: 3,
//     text: "Gibhub 관리",
//     color: "yellow",
//     checked: false,
//   },
// ];

interface Props {
  todos: TodoType[];
}

const index: NextPage<Props> = ({ todos }) => {
  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    console.log(data);

    return { props: { todos: data } };
  } catch (e) {
    console.log(e);
    return { props: { todos: [] } };
  }
};

export default index;
