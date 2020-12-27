import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useHandleHeight } from "../personnalHooks";

const initialValue = {
  todo: "",
  date: "",
  isImportant: false,
};

function CreateTodo({ createNewTodo }) {
  const [newTodo, setNewTodo] = useState(initialValue);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [isShowCreateTodo, setIsShowCreateTodo] = useState(true);

  const refCreateTodoForm = useRef();

  const { todo, date, isImportant } = newTodo;

  const [isShow, manageValue] = useHandleHeight(true, refCreateTodoForm, 15);

  const handleChange = (e) => {
    if (e.target.type !== "checkbox") {
      setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
    } else {
      const value = !isImportant;
      setNewTodo({ ...newTodo, [e.target.name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.todo.length > 0) {
      createNewTodo(newTodo);
      setNewTodo(initialValue);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleClick = () => {
    // if (isShowCreateTodo) {
    //   const height = refCreateTodoForm.current.scrollHeight + 15;
    //   refCreateTodoForm.current.style.height = `${height}px`;
    // } else {
    //   refCreateTodoForm.current.style.height = `0px`;
    // }
    // setIsShowCreateTodo((boolean) => !boolean);
    manageValue();
  };

  let classNameIcon = "createTodo_header_icon";
  classNameIcon += !isShow ? " createTodo_header_icon-close" : "";

  return (
    <div className="createTodo_container">
      <div className="createTodo_header" onClick={handleClick}>
        <h1 className="createTodo_header_title">Creer un Todo</h1>
        <div className={classNameIcon}>
          <IoClose />
        </div>
      </div>

      <form className="createTodo_form" onSubmit={handleSubmit} ref={refCreateTodoForm}>
        <div className="createTodo_inputs">
          <hr className="createTodo_form_hr" />
          <p className="createTodo_errorMessage">{showErrorMessage && "Veuillez entrer votre todo"}</p>
          <input type="text" id="newTodo" value={todo} name="todo" onChange={handleChange} />
        </div>
        <div className="createTodo_inputs">
          <label htmlFor="dateTodo">Avant le : </label>
          <input type="date" id="dateTodo" value={date} name="date" onChange={handleChange} />
        </div>
        <div className="createTodo_inputs">
          <label htmlFor="isImportantTodo">Noter comme important : </label>
          <input type="checkbox" checked={isImportant} name="isImportant" onChange={handleChange} />
        </div>
        <button className="createTodo_btn" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
