import React from 'react';
import { Spinner } from 'reactstrap';
export const AppSpinner = () => {
    return (
        <div className="center" style={{ marginLeft: '50px' }}>
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
        </div>
    )
}
