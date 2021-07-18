import React from 'react';

const GridHeader = (props) => {
    const {headerData} = props;
        return (
            <thead>
              <tr>
                {headerData.map((head)=>{
                  return (
                    <th>{head}</th>
                  )
                })}
              </tr>
            </thead>
          )
}
export default GridHeader;