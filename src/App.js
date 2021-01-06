import "./App.css";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/dashboard/Home";
function App() {
  return (
    <div className='body'>
      <Router>
        <Dashboard />
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
