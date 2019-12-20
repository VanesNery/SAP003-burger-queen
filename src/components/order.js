import React from 'react';

export default function Order(props) {
    return (
      <div className={props.className} key={item}> {props.name} R${props.price},00</div>
    )    
};