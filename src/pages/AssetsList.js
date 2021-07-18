import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveAssets,
  findAssetsByName,
  deleteAllAssets,
} from "../actions/assets";
import { useHistory } from "react-router-dom";
import { Table } from 'reactstrap';

import { Spinner } from 'reactstrap';
import { Button } from 'reactstrap';
import Search from "../components/search";
import GridHeader from "../components/grid-header";

const AssetlsList = () => {
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const assets = useSelector(state => state.assets);

  const dispatch = useDispatch();

  const routeChange = () => {
    let path = `add`;
    history.push(path);
  }

  useEffect(() => {
    dispatch(retrieveAssets());
  }, []);

  const onChangeSearchName = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentAsset(null);
    setCurrentIndex(-1);
  };

  const setActiveAsset = (asset, index) => {
    setCurrentAsset(asset);
    setCurrentIndex(index);
  };

  const removeAllAssets = () => {
    dispatch(deleteAllAssets())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    refreshData();
    dispatch(findAssetsByName(searchName));
  };

  const renderSpinner = () => {
    return (
      <div className="center" style={{ marginLeft: '50px' }}>
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
      </div>
    )
  }

  const searchData = {
    searchName,
    onChangeSearchName,
    findByName
  }

  const headerData = ['#','Name','Description','Action']

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {headerData.map((head)=>{
            return (
              <th>{head}</th>
            )
          })}
        </tr>
      </thead>
    )
  }

  return (
    <div className="row">
      <Search searchData={searchData}></Search>
      <div className="col-md-8">
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-md-8">
            <h4>Assets List</h4>
          </div>
          <div className="col-md-4" >
            <Button style={{ float: "right" }} onClick={routeChange} color="primary">Add</Button>{' '}
          </div>
        </div>
        {!isLoading ? <Table dark>
          <GridHeader headerData={headerData}></GridHeader>
          {assets.length > 0 && <tbody>
            {assets.map((crypto, index) => (
              <tr key={index}>
                <th style={{ textAlign: 'center' }} scope="row">{index + 1}</th>
                <td>{crypto.name}</td>
                <td>{crypto.description}</td>
                <td><Button onClick={() => setActiveAsset(crypto, index)} color="link">View</Button>{' '}</td>
              </tr>
            ))}
          </tbody>}
        </Table> : renderSpinner()}
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAssets}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-4" style={{ marginTop: '55px' }}>
        {currentAsset ? (
          <div>
            <h4>Asset</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentAsset.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentAsset.description}
            </div>
            <Link
              to={"/assets/" + currentAsset.id}
            >
              Edit
            </Link>
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default AssetlsList;