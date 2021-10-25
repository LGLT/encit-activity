import { Route, Switch } from "react-router-dom";

import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import Game from "./components/Game/Game";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Welcome} />
        {/* <Route exact path='/lobby' component={Lobby} /> */}
        <PrivateRoute exact path='/lobby' component={Lobby} type='Lobby' />
        <PrivateRoute exact path='/game' component={Game} type='Game'/>
      </Switch>
    </div>
  );
}

export default App;
