import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAsset, deleteAsset } from "../actions/assets";
import AssetDataService from "../services/AssetService";

const Asset = (props) => {
    const initialAssetState = {
        id: null,
        name: "",
        description: ""
    };
    const [currentAsset, setCurrentAsset] = useState(initialAssetState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getAsset = id => {
        AssetDataService.get(id)
            .then(response => {
                setCurrentAsset(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getAsset(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentAsset({ ...currentAsset, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentAsset.id,
            name: currentAsset.name,
            description: currentAsset.description,
        };

        dispatch(updateAsset(currentAsset.id, data))
            .then(response => {
                console.log(response);

                setCurrentAsset({ ...currentAsset, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateAsset(currentAsset.id, currentAsset))
            .then(response => {
                console.log(response);

                setMessage("The asset was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeAsset = () => {
        dispatch(deleteAsset(currentAsset.id))
            .then(() => {
                props.history.push("/assets");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentAsset ? (
                <div className="edit-form">
                    <h4>Asset</h4>
                    <form style={{ marginBottom: "10px" }}>
                        <div className="form-group">
                            <label htmlFor="name">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentAsset.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentAsset.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <Button style={{ marginRight: "10px" }} color="danger" onClick={removeAsset}>
                        Delete
                    </Button>
                    <Button
                        type="submit"
                        color="success"
                        onClick={updateContent}
                    >
                        Update
                    </Button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Asset...</p>
                </div>
            )}
        </div>
    );
};

export default Asset;