import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsset } from "../actions/assets";
import { useHistory } from "react-router-dom";

const AddAsset = () => {
    const initialAssetState = {
        id: null,
        name: "",
        description: ""
    };
    const [asset, setAsset] = useState(initialAssetState);
    const [submitted, setSubmitted] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAsset({ ...asset, [name]: value });
    };

    const saveAsset = () => {
        const { name, description } = asset;

        dispatch(createAsset(name, description))
            .then(data => {
                setAsset({
                    id: data.id,
                    name: data.name,
                    description: data.description
                });
                setSubmitted(true);
                let path = `assets`; 
                history.push(path);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newAsset = () => {
        setAsset(initialAssetState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newAsset}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={asset.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={asset.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveAsset} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddAsset;