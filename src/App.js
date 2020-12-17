
import "./App.css"
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import Landing from "./Components/Landing"
import Welcome from "./Components/Welcome";

function App() {


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route path={"/welcome/:userId"} component={Welcome} /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
