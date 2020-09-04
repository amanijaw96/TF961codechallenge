import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loading from "./components/Loading/Loading";

const Employees = React.lazy(() => import("./containers/Employees/index"));
// const Article = React.lazy(() => import("./containers/Article/index"));

function App() {
  const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
        <div className="container-fluid">
          <Component {...props} />
        </div>
      )}
    />
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <React.Suspense fallback={<Loading />}>
            <RestrictedRoute path="/" exact={true} component={Employees} />
          </React.Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
