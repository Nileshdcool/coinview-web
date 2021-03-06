import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAsset from "./pages/AddAsset";
import Asset from "./pages/Asset";
import AssetsList from "./pages/AssetsList";
import Cryptocurrencies from "./pages/cryptocurrencies";
import Exchanges from "./pages/exchanges";
import { Badge } from 'reactstrap';
import ComingSoon from "./pages/comingsoon";

function App() {
  return (
    <Router>
      <nav style={{ paddingBottom: '0.1rem', paddingTop: '0.5rem' }} className="navbar navbar-expand navbar-dark bg-dark">
        <h6 style={{ marginLeft: '10px' }}><Badge color="secondary">Cryptos:<span style={{ color: "rgb(97, 136, 255)" }}>10,945</span></Badge></h6>
        <h6><Badge color="secondary">Exchanges:<span style={{ color: "rgb(97, 136, 255)" }}>385</span></Badge></h6>
        <h6><Badge color="secondary">Market Cap: <span style={{ color: "rgb(97, 136, 255)" }}>$1,294,743,573,277</span></Badge></h6>
        <h6><Badge color="secondary">24h Vol: <span style={{ color: "rgb(97, 136, 255)" }}>$52,529,691,582</span></Badge></h6>
        <h6><Badge color="secondary">Dominance: <span style={{ color: "rgb(97, 136, 255)" }}>BTC: 45.9% ETH: 17.2%</span></Badge></h6>
        <h6><Badge color="secondary">Eth Gas:<span style={{ color: "rgb(97, 136, 255)" }}>19 Gwei</span></Badge></h6>
      </nav>
      <hr style={{ margin: '0.01rem' }}></hr>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a style={{ marginLeft: '20px' }} href="/assets" className="navbar-brand">
          CoinView.AI
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cryptocurrencies"} className="nav-link">
              Cryptocurrencies
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/assets"} className="nav-link">
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Exchanges
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              NFT
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Watchlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Calendars
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/comingsoon"} className="nav-link">
              Learn
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">

        <Switch>
          <Route exact path={["/", "/cryptocurrencies"]} component={Cryptocurrencies} />
          <Route exact path={["/exchanges"]} component={Exchanges} />
          <Route exact path="/add" component={AddAsset} />
          <Route exact path="/assets" component={AssetsList} />
          <Route path="/assets/:id" component={Asset} />
          <Route path="/comingsoon" component={ComingSoon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;