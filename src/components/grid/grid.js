import React from 'react';

const Grid = (prop) => {
    const { header, data } = props;
    return (
        <Table dark>
            <thead>
                <tr>
                    {header && header.map((head, index) => (
                        <th>{head}</th>
                    ))}
                </tr>
            </thead>
            {assets.length > 0 && <tbody>
                {assets.map((crypto, index) => (
                    <tr key={index}>
                        <th style={{ textAlign: 'center' }} scope="row">{crypto.cmc_rank}</th>
                        <td> <img src={getLogo(crypto.id)} /></td>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol}</td>
                        <td>{numberWithCommas(crypto.max_supply)}</td>
                        <td>${crypto.quote.USD.price.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>}
        </Table>
    )
}

