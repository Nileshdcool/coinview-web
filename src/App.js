import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAsset from "./components/AddAsset";
import Asset from "./components/Asset";
import AssetsList from "./components/AssetsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/assets" className="navbar-brand">
          CoinView.AI
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/assets"} className="nav-link">
              Assets
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
           <Route exact path={["/", "/assets"]} component={AssetsList} />
          <Route exact path="/add" component={AddAsset} />
          <Route path="/assets/:id" component={Asset} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;