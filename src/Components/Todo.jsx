import React, { useEffect, useState } from "react";
import { IoWarningSharp } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";

function Todo({ dataTodo, deleteTodo, id }) {
  const [dateNow, setDateNow] = useState();
  const [isPass, setIsPass] = useState(false);

  const { todo, date, isImportant } = dataTodo;

  useEffect(() => {
    const dateNow = new Date();
    const myDate =
      `${dateNow.getFullYear().toString()}-` +
      `${dateNow.getMonth().toString().padStart(2, "0")}-` +
      `${dateNow.getDate().toString().padStart(2, "0")}`;
    setDateNow(myDate);
  }, []);

  useEffect(() => {
    if (dateNow !== undefined && date !== "") {
      const tabDateNow = dateNow.split("-");
      const tabDateTodo = date.split("-");

      if (tabDateNow[0] === tabDateTodo[0]) {
        for (let i = 1; i < tabDateNow.length; i++) {
          if (tabDateNow[i] > tabDateTodo[i]) {
            setIsPass(true);
            break;
          }
        }
      } else if (tabDateNow[0] > tabDateTodo[0]) {
        setIsPass(true);
      }
    }
  }, [dateNow, date]);

  const styleDate = isPass ? { color: "red" } : { color: "black" };

  return (
    <div className="todo_container">
      <div className="todo_todo">
        {isImportant && <IoWarningSharp className="todo_warning_logo" />}
        <h3>{todo}</h3>
      </div>
      <div className="todo_containerRight">
        <p className="todo_date" style={styleDate}>
          {date}
        </p>
        <button className="todo_btn" onClick={() => deleteTodo(id)}>
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
}

export default Todo;
