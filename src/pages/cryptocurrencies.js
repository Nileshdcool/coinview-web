import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllAssets,
    findAssetsByTitle,
} from "../actions/assets";

const Cryptocurrencies = (props) => {
    const [currentAsset, setCurrentAsset] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchTitle] = useState("");

    const assets = useSelector(state => state.assets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveAllAssets());
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

    const findByName = () => {
        refreshData();
        dispatch(findAssetsByTitle(searchName));
    };

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>ATH</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Cryptocurrencies;