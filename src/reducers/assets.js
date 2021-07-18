import {
    CREATE_ASSET,
    RETRIEVE_ASSETS,
    RETRIEVE_ALL_ASSETS,
    UPDATE_ASSET,
    DELETE_ASSET,
    DELETE_ALL_ASSETS,
    GET_CRYPTO_INFO
} from "../actions/types";

const initialState = [];

function assetReducer(assets = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ASSET:
            return [...assets, payload];

        case RETRIEVE_ASSETS:
        case RETRIEVE_ALL_ASSETS:
            return payload;

        case UPDATE_ASSET:
            return assets.map((asset) => {
                if (asset.id === payload.id) {
                    return {
                        ...asset,
                        ...payload,
                    };
                } else {
                    return asset;
                }
            });

        case DELETE_ASSET:
            return assets.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_ASSETS:
            return [];

        default:
            return assets;
    }
};

export default assetReducer;