import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default function Order(props) {
    return (
<div className={props.className}> 
<span>{props.quantity+ 'x'}</span> <span>{props.name}</span>
<span> {props.typeOption}</span> <span>{props.typeExtra}</span>
<input className={css(styles.button)} onClick={() => props.onClick(props)}/>  
</div>
    )    
};

const styles = StyleSheet.create({
  button: {
    backgroundImage: 'url("../images/trash.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    border: 'none',
    padding:'1vw',
    size: '1vw',
    cursor: 'pointer',
  }
});
