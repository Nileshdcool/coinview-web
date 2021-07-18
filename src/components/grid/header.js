import React from 'react';
const Header = (props) => {
    const { header, data } = props;
    return (
        <thead>
            <tr>
                {header && header.map((head, index) => (
                    <th>{head}</th>
                ))}
            </tr>
        </thead>
    )
}
export default Header;