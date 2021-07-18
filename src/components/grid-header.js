import React from 'react';

const GridHeader = (props) => {
    const {headerData} = props;
        return (
            <thead>
              <tr>
                {headerData.map((head,index)=>{
                  return (
                    <th key={index}>{head}</th>
                  )
                })}
              </tr>
            </thead>
          )
}
export default GridHeader;