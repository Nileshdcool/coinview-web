import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveAssets,
  findAssetsByTitle,
  deleteAllAssets,
} from "../actions/assets";

const AssetlsList = () => {
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchTitle] = useState("");

  const assets = useSelector(state => state.assets);
  const dispatch = useDispatch();

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
    debugger;
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
    dispatch(findAssetsByTitle(searchName));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Assets List</h4>

        <ul className="list-group">
          {assets &&
            assets.map((asset, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAsset(asset, index)}
                key={index}
              >
                {asset.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAssets}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
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
        ) : (
          <div>
            <br />
            <p>Please click on a Asset...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetlsList;