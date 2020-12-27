import React, { useEffect, useRef } from "react";
import { useHandleHeight } from "../personnalHooks";
import Todo from "./Todo";
import { IoClose } from "react-icons/io5";

function Todos({ tabTodos, todosObject, deleteTodo, children }) {
  const refTodos = useRef();

  const [isShow, manageValue] = useHandleHeight(false, refTodos);

  useEffect(() => {
    if (tabTodos.length > 0 && !isShow) {
      const height = refTodos.current.scrollHeight;
      refTodos.current.style.height = `${height}px`;
    }
  }, [tabTodos]);

  const showTodos = tabTodos.map((item) => {
    if (todosObject[Object.keys(item)] === undefined) {
      return null;
    }
    return (
      <Todo
        dataTodo={todosObject[Object.keys(item)]}
        key={Object.keys(item)}
        id={Object.keys(item)}
        deleteTodo={deleteTodo}
      />
    );
  });

  const handleClick = () => {
    manageValue();
  };

  let className = "todos_section_header_icon";
  className += isShow ? " todos_section_header_icon-show" : "";

  return (
    <div className="todos_section">
      <div className="todos_section_header" onClick={handleClick}>
        <h3 className="todos_title2">{`${children} : ${tabTodos.length}`}</h3>
        <div className={className}>
          <IoClose />
        </div>
      </div>
      <div className="todos_todos" ref={refTodos}>
        {showTodos}
      </div>
    </div>
  );
}

export default Todos;
