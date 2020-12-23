import React from "react";
import Header from "./Header";
import TodosApp from "./TodosApp";
import MoviesApp from "./MoviesApp";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Welcome(props) {
  return (
    <div className="welcome_page">
      <Router>
        <Header history={props.history} />
        <Switch>
          <Route path={"/welcome/:userId/todos"}>
            <TodosApp userId={props.match.params.userId} />
          </Route>
          <Route path={"/welcome/:userId/movies"}>
            <MoviesApp userId={props.match.params.userId} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default Welcome;
