import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import { createBrowserHistory } from "history";
import { GlobalProvider } from './context/GlobalState';
import { GoalTrackerGlobalProvider } from './context/GoalTrackerState';

export function isAuthenticate() {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Dashboard />
  ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}

function App() {
  const history = createBrowserHistory();


  return (
    <GlobalProvider>

      <Router history={history} >
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard" >
            {isAuthenticate}
          </Route>
          <Route path="/goaltracker" >
            {isAuthenticate}
          </Route>
          <Route path="/" >
            <Login />
          </Route>
        </Switch>
      </Router>

    </GlobalProvider>
  );
}

export default App;
