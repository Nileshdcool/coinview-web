import React from 'react';
import { Button } from 'reactstrap';
import { SEARCH } from '../helper/constants';

const Search = (props) => {
    return (
        <>
            <div className="col-md-12">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={props.searchData.searchName}
                        onChange={props.searchData.onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <Button
                            color="primary"
                            type="button"
                            onClick={props.searchData.findByName}
                        >
                           {SEARCH}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Search;