import {
    RETRIEVE_ALL_ASSETS
} from "../actions/types";

const initialState = [];

function cryptoReducer(assets = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ALL_ASSETS:
            return payload;

        default:
            return assets;
    }
};

export default cryptoReducer;