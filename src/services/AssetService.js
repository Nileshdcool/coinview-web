import http from "../http-common";

const getAll = () => {
    return http.get("/assets").catch(err=>err);
};

const getAllAssets = () => {
    return http.get("/assets/getAllAssets").catch(err=>err);
};

const get = id => {
    return http.get(`/assets/${id}`).catch(err=>err);
};

const create = data => {
    return http.post("/assets", data).catch(err=>err);
};

const update = (id, data) => {
    return http.put(`/assets/${id}`, data).catch(err=>err);
};

const remove = id => {
    return http.delete(`/assets/${id}`).catch(err=>err);
};

const removeAll = () => {
    return http.delete(`/assets`).catch(err=>err);
};

const findByName = name => {
    return http.get(`/assets?name=${name}`).catch(err=>err);
};

const getCryptoInfo = id => {
    return http.get(`/assets/getCryptoInfo?id=${id}`).catch(err=>err);
};

const AssetService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    getAllAssets,
    getCryptoInfo
};

export default AssetService;