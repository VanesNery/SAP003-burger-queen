import React, { useState, useEffect } from 'react';
import {StyleSheet, css} from 'aphrodite';
import db from '../components/util/firebaseUtils';
import Button from '../components/button';
import Input from '../components/input';
import Card from '../components/card';

export default function Hall() {
  const [menus, setMenus] = useState([])
  const [menuBreak, setmenuBreak] = useState([])
  const [menuLunch, setmenuLunch] = useState([])
  const [order, setOrder] = useState([])
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fireBreak = db.collection('breakfast');
    const fireLunch = db.collection('lunch');
    fireBreak.get().then((querySnapshot) => {
      const product = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setmenuBreak(product)
    })
    fireLunch.get().then((querySnapshot) => {
      const product = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setmenuLunch(product)
    })
  }, []);

  function addOrder(product) {
    setOrder([...order, product])
  }

  const openOptions = (product) => {
    if (product.options){
      setOptions(product);
    } else {
      setOptions([])
      addOrder(product)
    }
  }

  const total = order.reduce(function (acc, product) {return acc + product.price}, 0);
  const product = menus === "breakfast" ? menuBreak : menuLunch;

  return (
    <main>
        <header>
          <h2>Burguer Queen - Garçom</h2>
          <img src='../Logo_BQ.png' alt='' />
        </header>
        <aside className={css(styles.card)}>
        <fieldset>Pedido
        <ul>Cliente: <Input className={css(styles.input)} placeholder="Nome" title="Cliente" type="text" /></ul>
        <ul>Nº da Mesa: <Input className={css(styles.input)} placeholder="Mesa" title="Nº da Mesa" type="number" min="0" /></ul>
        </fieldset>
        <br></br>
        <Button className={css(styles.button)} handleClick={() => setMenus("breakfast")} title="Café da Manhã" />
        <Button className={css(styles.button)} handleClick={() => setMenus("lunch")} title="Resto do Dia" />
        <p>
          {
          product.map((product) => <Card className={css(styles.button)} name={product.name} price={product.price} 
          handleClick={() => openOptions(product)}/>)
          }
          </p>
        <div>{ options.length !== 0 ? 
          options.options.map(elem => <Button className={css(styles.button)} handleClick={() =>{ 
            const option = {...options, type: elem}; addOrder(option)}} title={elem}/>) : false
        }</div>
      </aside>
      <aside>
      <fieldset className={css(styles.order)}>
        {
        order.map((product, item) =>
        <div key={item}> {product.quantity} {product.name} {product.type ? product.type : ""} 
          R$:{product.price},00 </div>)     
        }
        <strong className={css(styles.sum)}>Total: R${total},00</strong>
      </fieldset>
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: '2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    color: 'white',
  },
  
  button: {
    backgroundColor: '#77dd77',
    fontSize: '16px',
    fontWeight: 'bold', 
    size: '20px',
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
  },

  sum: {
    backgroundColor: 'black',
    color: 'white',
    size: '100px',
  },

  card: {
    width: '50%',
    float: 'left',
    border: 'none',
    alignItems: 'center',
 },

  order: {
    width: '40%',
    float: 'right',
    border: 'none',
    alignItems: 'center',
  },
})