import {
    RETRIEVE_ALL_ASSETS,
    GET_CRYPTO_INFO
} from "./types";

import AssetDataService from "../services/AssetService";

//TODO:- set name as getAllCrypto

export const retrieveAllAssets = () => async (dispatch) => {
    try {
        const res = await AssetDataService.getAllAssets();

        dispatch({
            type: RETRIEVE_ALL_ASSETS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getCryptoInfo = (id) => async (dispatch) => {
    try {
        const res = await AssetDataService.getCryptoInfo(id);

        dispatch({
            type: GET_CRYPTO_INFO,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};