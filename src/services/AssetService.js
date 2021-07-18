import http from "../http-common";

const getAll = () => {
    return http.get("/assets");
};

const getAllAssets = () => {
    return http.get("/assets/getAllAssets");
};

const get = id => {
    return http.get(`/assets/${id}`);
};

const create = data => {
    return http.post("/assets", data);
};

const update = (id, data) => {
    return http.put(`/assets/${id}`, data);
};

const remove = id => {
    return http.delete(`/assets/${id}`);
};

const removeAll = () => {
    return http.delete(`/assets`);
};

const findByName = name => {
    return http.get(`/assets?name=${name}`);
};

const AssetService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    getAllAssets
};

export default AssetService;