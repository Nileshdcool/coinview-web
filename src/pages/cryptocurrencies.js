import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllAssets,

} from "../actions/crypto";
import { AppSpinner } from '../components/spinner';
import GridHeader from "../components/grid-header";
import { SubHeader } from '../components/sub-header';
import Search from '../components/search';

function numberWithCommas(x) {
    if (!x) {
        return '';
    }
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const Cryptocurrencies = (props) => {
    const [currentAsset, setCurrentAsset] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(50);

    let assets = useSelector(state => {
        if (state.crypto.length > 0) {
            if (isLoading) {
                setIsLoading(false);
            }
            if (searchName !== '') {
                return state.crypto.filter((c) => {
                    if (c.name.toLowerCase().includes(searchName.toLowerCase())) {
                        return c;
                    }
                }).slice(0, pageSize);
            }
            return state.crypto.slice(0, pageSize);
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
        setIsLoading(true);
        refreshData();
        dispatch(retrieveAllAssets());
    };

    const getLogo = (id) => {
        return 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + id + '.png';
    }

    const searchData = {
        searchName,
        onChangeSearchName,
        findByName
    }

    const headerData = ['#', '', 'Name', 'Symbol', 'Max Supply', 'Price'];

    return (
        <>
            <SubHeader></SubHeader>
            {!isLoading ? <>
                <Search searchData={searchData}></Search>
                <Table dark>
                    <GridHeader headerData={headerData}></GridHeader>
                    {assets.length > 0 && <tbody>
                        {assets.map((crypto, index) => (
                            <tr key={index}>
                                <th style={{ textAlign: 'center' }} scope="row">{crypto.cmc_rank}</th>
                                <td style={{ textAlign: 'right' }}>  <img src={getLogo(crypto.id)} /></td>
                                <td>{crypto.name}</td>
                                <td>{crypto.symbol}</td>
                                <td>{numberWithCommas(crypto.max_supply)}</td>
                                <td>${crypto.quote ? crypto.quote.USD.price.toFixed(2) : ''}</td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
            </> : <AppSpinner></AppSpinner>}
        </>
    );
}

export default Cryptocurrencies;