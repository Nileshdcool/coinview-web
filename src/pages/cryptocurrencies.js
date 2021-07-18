import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllAssets,

} from "../actions/crypto";
import { Spinner } from 'reactstrap';

function numberWithCommas(x) {
    if (!x) {
        return '';
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const renderSpinner = () => {
    return (
        <div className="center" style={{ marginLeft: '50px' }}>
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        </div>
    )
}

const Cryptocurrencies = (props) => {
    const [currentAsset, setCurrentAsset] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    let assets = useSelector(state => {
        if (state.crypto.length > 0) {
            if (isLoading) {
                setIsLoading(false);
            }
            return state.crypto.slice(0, 50);
        }
    });

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
        // dispatch(findAssetsByTitle(searchName));
    };

    const getLogo = (id) => {
        return 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + id + '.png';
    }

    return (
        <>
            <h2>Today's Cryptocurrency Prices by Market Cap</h2>
            <h5>The global crypto market cap is $1.31T, a 5.32% increase over the last day.</h5>
            {!isLoading ? <Table dark>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Max Suppy</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {assets.length > 0 && <tbody>
                    {assets.map((crypto, index) => (
                        <tr key={index}>
                            <th style={{ textAlign: 'center' }} scope="row">{crypto.cmc_rank}</th>
                            <td style={{textAlign:'right'}}>  <img src={getLogo(crypto.id)} /></td>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>{numberWithCommas(crypto.max_supply)}</td>
                            <td>${crypto.quote ? crypto.quote.USD.price.toFixed(2) : ''}</td>
                        </tr>
                    ))}
                </tbody>}
            </Table> : renderSpinner()}
        </>
    );
}

export default Cryptocurrencies;