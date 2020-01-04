import React from 'react';

export default function Order(props) {
    return (
<div className={props.className} key={props}> {props.quantity} {props.name} {props.type} {props.additional}</div>
    )    
};