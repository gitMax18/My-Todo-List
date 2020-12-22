import React, { useEffect, useState, useCallback } from "react";
import CreateTodo from "./CreateTodo";
import Todos from "./Todos";

import { addDataTodo, deleteData, getDataTodos } from "../firebase";

function TodosApp({ userId }) {
  const [todos, setTodos] = useState({});
  const [todosWithDate, setTodoWithDate] = useState([]);
  const [todosNoDate, setTodoNoDate] = useState([]);

  //Fonction qui permet de trier les todos avec date dans l'ordre chronologique
  const sortTodoWithDate = useCallback(
    (tabTodos) => {
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
    },
    [todos]
  );

  useEffect(() => {
    //Fonction qui permet de séparer la liste de Todos en 2 tableaux en fonction de la présence de Date
    const tabTodosDate = [];
    const tabTodosNoDate = [];
    Object.keys(todos).forEach((key) => {
      if (todos[key].date === "") {
        tabTodosNoDate.push({ [key]: todos[key] });
      } else {
        tabTodosDate.push({ [key]: todos[key] });
      }
    });
    setTodoNoDate(tabTodosNoDate);
    sortTodoWithDate(tabTodosDate);
  }, [todos, sortTodoWithDate]);

  useEffect(() => {
    getDataTodos(userId).then((data) => setTodos(data));
  }, [userId]);

  const createNewTodo = (todo) => {
    const id = Date.now();
    const newTodo = { [`todo-${id}`]: todo };
    setTodos({ ...todos, ...newTodo });
    addDataTodo(userId, newTodo);
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
