import React from 'react';
import { Table } from 'reactstrap';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveAllAssets,
    findAssetsByTitle,
    getCryptoInfo
    
} from "../actions/assets";

const Cryptocurrencies = (props) => {
    const [currentAsset, setCurrentAsset] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchTitle] = useState("");

    const assets = useSelector(state => {
        return state.assets.slice(0, 50);
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
        dispatch(findAssetsByTitle(searchName));
    };
    
    const getLogo = (id) => {
        // console.log(id);
        // dispatch(getCryptoInfo(id));
        return 'https://s2.coinmarketcap.com/static/img/coins/64x64/'+id+'.png';
    }

    return (
        <>  
            <Table dark>
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
                {assets.length>0 && <tbody>
                   {assets.map((crypto,index)=>(
                        <tr key={index}>
                        <th scope="row">{crypto.cmc_rank}</th>
                        <td> <img src={getLogo(crypto.id)}/></td>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol}</td>
                        <td>{crypto.max_supply}</td>
                        <td>{crypto.quote.USD.price}</td>
                    </tr>
                   ))}
                </tbody>}
            </Table>
        </>
    );
}

export default Cryptocurrencies;