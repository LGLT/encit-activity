import { Route, Switch } from "react-router-dom";

import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import Game from "./components/Game/Game";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/lobby' component={Lobby} />
        <Route exact path='/game' component={Game} />
      </Switch>
    </div>
  );
}

export default App;
