import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsset } from "../actions/assets";
import { useHistory } from "react-router-dom";
import { ADD, SUBMIT, YOU_SUBMITTED_SUCCESSFULLY } from '../helper/constants';
import Input from '../components/input';

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
    const nameInput = {
        htmlFor: 'name',
        label: 'Name',
        id: 'name',
        value: asset.name,
        handleInputChange,
        name: 'name'
    }
    const descInput = {
        htmlFor: 'description',
        label: 'Description',
        id: 'description',
        value: asset.description,
        handleInputChange,
        name: 'description'
    }
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>{YOU_SUBMITTED_SUCCESSFULLY}</h4>
                    <button className="btn btn-success" onClick={newAsset}>
                        {ADD}
                    </button>
                </div>
            ) : (
                <>
                    <div style={{marginBottom:'20px'}}>
                        <Input attributes={nameInput}></Input>
                        <Input attributes={descInput}></Input>
                    </div>
                    <div>
                        <button onClick={saveAsset} className="btn btn-success">
                            {SUBMIT}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddAsset;