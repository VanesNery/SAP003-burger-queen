import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default function Order(props) {
    return (
<div className={props.className}> 
<span>{props.quantity}</span> <span>{props.name}</span>
<span> {props.type}</span> 
<img src="../images/trash.png" className={css(styles.button)} onClick={() => props.onClick(props)}/>  
</div>
    )    
};

const styles = StyleSheet.create({
  button: {
    size:'5%',
    cursor: 'pointer',
  }
});