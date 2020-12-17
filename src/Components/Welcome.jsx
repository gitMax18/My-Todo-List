import React from "react";
import Header from "./Header";
import TodosApp from "./TodosApp";
import Footer from "./Footer";

function Welcome(props) {
  return (
    <div className="welcome_page">
      <Header history={props.history} />
      <TodosApp userId={props.match.params.userId} />
      <Footer />
    </div>
  );
}

export default Welcome;
