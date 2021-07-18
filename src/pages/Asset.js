import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAsset, deleteAsset } from "../actions/assets";
import AssetDataService from "../services/AssetService";
import Input from '../components/input';
import { ASSET, DELETE, UPDATE } from "../helper/constants";

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

    const updateContent = () => {
        dispatch(updateAsset(currentAsset.id, currentAsset))
            .then(response => {
                console.log(response);
                props.history.push("/assets");
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

    const nameInput = {
        htmlFor: 'name',
        label: 'Name',
        id: 'name',
        value: currentAsset.name,
        handleInputChange,
        name: 'name'
    }
    const descInput = {
        htmlFor: 'description',
        label: 'Description',
        id: 'description',
        value: currentAsset.description,
        handleInputChange,
        name: 'description'
    }

    return (
        <div>
            <div className="edit-form">
                <h4>{ASSET}</h4>
                <form style={{ marginBottom: "10px" }}>
                <Input attributes={nameInput}></Input>
                <Input attributes={descInput}></Input>
                </form>
                <Button style={{ marginRight: "10px" }} color="danger" onClick={removeAsset}>
                    {DELETE}
                </Button>
                <Button
                    type="submit"
                    color="success"
                    onClick={updateContent}
                >
                    {UPDATE}
                </Button>
                <p>{message}</p>
            </div>

        </div>
    );
};

export default Asset;