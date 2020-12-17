import React, { useState, useEffect, useRef } from "react";
import Todo from "./Todo";
import { IoClose } from "react-icons/io5";

function Todos({ tabTodos, todosObject, deleteTodo, children }) {
  const [isShowSections, setIsShowSections] = useState(true);

  //Ref qui sert a gérer la hauteur de la section au défillement
  const refTodos = useRef();

  useEffect(() => {
    if (isShowSections) {
      const height = refTodos.current.scrollHeight;
      refTodos.current.style.height = `${height}px`;
    } else {
      refTodos.current.style.height = `0px`;
    }
  }, [tabTodos, isShowSections]);

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

  const handleClick = (e) => {
    if (isShowSections) {
      setIsShowSections(false);
    } else {
      setIsShowSections(true);
    }
  };

  let className = "todos_section_header_icon";
  className += !isShowSections ? " todos_section_header_icon-show" : "";

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
