import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

// import logo from './logo.svg';
import './App.css';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Topic() {
  let { topicId } = useParams();
  return (
  <h3>Request topics ID: {topicId}</h3>
  );
}

function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={match.url + '/components'}>Components</Link>
        </li>
        <li>
          <Link to={match.url + '/props-v-state'}>Props v. State</Link>
        </li>
      </ul>

      {
      /** The Topics has its own <Switch> with more routes that build on the /topics URL path.
       * You can think of the secons <Route> here as an "index" page for all topics, or the page
       * that is shown when no topic is selected.
       */
      }
      <Switch>
        <Route path={match.path + '/:topicId'}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>
      </div>
      {
        /**
         * A <Switch> looks through its children <Route>s and renders the first one that matches
         * the current URL.
         */
      }
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
