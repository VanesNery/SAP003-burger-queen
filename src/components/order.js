import React from 'react';

export default function Order(props) {
    return (
<div className={props.className} key={props}> {props.quantity} {props.name} {props.type} R${props.price},00</div>
    )    
};