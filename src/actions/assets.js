import {
    CREATE_ASSET,
    RETRIEVE_ASSETS,
    UPDATE_ASSET,
    DELETE_ASSET,
    DELETE_ALL_ASSETS
} from "./types";

import AssetDataService from "../services/AssetService";

export const createAsset = (name, description) => async (dispatch) => {
    try {
        const res = await AssetDataService.create({ name, description });

        dispatch({
            type: CREATE_ASSET,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveAssets = () => async (dispatch) => {
    try {
        const res = await AssetDataService.getAll();

        dispatch({
            type: RETRIEVE_ASSETS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateAsset = (id, data) => async (dispatch) => {
    try {
        const res = await AssetDataService.update(id, data);

        dispatch({
            type: UPDATE_ASSET,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteAsset = (id) => async (dispatch) => {
    try {
        await AssetDataService.remove(id);

        dispatch({
            type: DELETE_ASSET,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllAssets = () => async (dispatch) => {
    try {
        const res = await AssetDataService.removeAll();

        dispatch({
            type: DELETE_ALL_ASSETS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findAssetsByName = (name) => async (dispatch) => {
    try {
        const res = await AssetDataService.findByName(name);

        dispatch({
            type: RETRIEVE_ASSETS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};