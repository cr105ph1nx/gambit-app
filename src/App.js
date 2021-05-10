import "antd/dist/antd.css";
import "./App.css";
import Board from "./features/board/Board";
import Login from "./features/login/Login";
import Panel from "./features/panel/Panel";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/board" component={Board} />
          <Route exact path="/panel" component={Panel} />
          <Route path="/" component={() => <Redirect to="/login" />} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
