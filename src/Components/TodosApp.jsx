import React, { useEffect, useState, useRef } from "react";
import CreateTodo from "./CreateTodo";
import Todos from "./Todos";
// import { IoClose } from "react-icons/io5";

import { addData, deleteData, getData } from "../firebase";

function TodosApp({ userId }) {
  const [todos, setTodos] = useState({});
  const [todosWithDate, setTodoWithDate] = useState([]);
  const [todosNoDate, setTodoNoDate] = useState([]);

  //Fonction qui permet de séparer la liste de Todos en 2 tableaux en fonction de la présence de Date
  const splitTodos = (todosObject) => {
    const tabTodosDate = [];
    const tabTodosNoDate = [];
    Object.keys(todosObject).forEach((key) => {
      if (todosObject[key].date === "") {
        tabTodosNoDate.push({ [key]: todosObject[key] });
      } else {
        tabTodosDate.push({ [key]: todosObject[key] });
      }
    });
    setTodoNoDate(tabTodosNoDate);
    sortTodoWithDate(tabTodosDate);
  };

  //Fonction qui permet de trier les todos avec date dans l'ordre chronologique
  const sortTodoWithDate = (tabTodos) => {
    if (tabTodos.length > 1) {
      tabTodos.sort((a, b) => {
        a = todos[Object.keys(a)].date.split("-");
        b = todos[Object.keys(b)].date.split("-");
        let value;
        for (let i = 0; i < a.length; i++) {
          if (a[i] < b[i]) {
            return (value = -1);
          }
          if (a[i] > b[i]) {
            return (value = 1);
          }
          if (a[2] === b[2]) {
            return (value = 0);
          }
        }
        return value;
      });
    }
    setTodoWithDate(tabTodos);
  };

  useEffect(() => {
    splitTodos(todos);
  }, [todos]);

  useEffect(() => {
    getData(userId).then((data) => setTodos(data));
  }, [userId]);

  const createNewTodo = (todo) => {
    console.log(todo);
    const id = Date.now();
    const newTodo = { [`todo-${id}`]: todo };
    setTodos({ ...todos, ...newTodo });
    addData(userId, newTodo);
  };

  const deleteTodo = (todoId) => {
    const newTodos = todos;
    delete newTodos[todoId];
    setTodos({ ...newTodos });
    deleteData(userId, todoId[0]);
  };

  return (
    <div className="todosApp_page">
      <div className="todosApp_container">
        <CreateTodo createNewTodo={createNewTodo} />
        <h1 className="todosApp_title">Mes Todos</h1>
        <Todos tabTodos={todosNoDate} todosObject={todos} deleteTodo={deleteTodo}>
          Sans dates
        </Todos>
        <Todos tabTodos={todosWithDate} todosObject={todos} deleteTodo={deleteTodo}>
          Avec dates
        </Todos>
      </div>
    </div>
  );
}

export default TodosApp;
