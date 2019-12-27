import React, { useState, useEffect } from 'react';
import {StyleSheet, css} from 'aphrodite';
import db from '../components/util/firebaseUtils';
import Button from '../components/button';
import Input from '../components/input';
import Card from '../components/card';
import Order from '../components/order';

export default function Hall() {
  const [menus, setMenus] = useState([])
  const [menuBreak, setmenuBreak] = useState([])
  const [menuLunch, setmenuLunch] = useState([])
  const [order, setOrder] = useState([])
  const [options, setOptions] = useState([])
  // const [extras, setExtras] = useState([])
  const [client, setClient] = useState('')
  const [desk, setDesk] = useState(0)

  useEffect(() => {
    const fireBreak = db.collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('breakfast');
    const fireLunch = db.collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('lunch');
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

  const clientName = (e) => {
    const inputValue = e.target.value
    setClient(inputValue)
  }

  const numberDesk = (e) => {
    const inputValue = e.target.value
    setDesk(inputValue)
  }

  const addOrder = (product) => {
    setOrder([...order, product])
  }

  const openOptions = (product) => {
    if (product.options){
      setOptions(product);
      // setExtras(product)
    } else {
      setOptions([])
      addOrder(product)
    }
  }

  const sendOrder = (order) => {
    if (order.length && desk) {
      const product = order.map((order) => {
        if (order.extras.length){
          return (` ${order.client} (${order.options}): ${order.extras}`)
        } else if (order.options.length){
          return ` ${order.client} (${order.options})`
        } else {
          return `${order.client}` 
        }
      })
    
      const clientOrder = {
        client: clientName,
        desk,
        product,
        total,
      }
    
      db.collection('orders').add(clientOrder)
      setOrder(order);
    	setClient(client);
    	setDesk(desk);
    } else if (!order.length) {
      alert('Coloque pelo menos 1 item no pedido!')
      
    } else {
      alert('Preencha o número da mesa!')
    }
    }

  const total = order.reduce(function (acc, product) {return acc + product.price}, 0);
  const product = menus === "breakfast" ? menuBreak : menuLunch;

  return (
    <main>
        <header>
        <img className={css(styles.header)} src='../Burguer Queen.png' alt='Burguer Queen - Aréa do Garçom' width='150' />
        </header>
        <aside className={css(styles.card)}>
        <fieldset>Pedido
        <ul>Cliente: <Input className={css(styles.input)} title="Cliente" type="text" onChange={ClientName}/></ul>
        <ul>Nº da Mesa: <Input className={css(styles.input)} title="Nº da Mesa" type="number" min="0" onChange={numberDesk}/></ul>
        </fieldset>
        <br></br>
        <Button className={css(styles.button)} handleClick={() => setMenus("breakfast")} title="Café da Manhã" />
        <Button className={css(styles.button)} handleClick={() => setMenus("lunch")} title="Resto do Dia" />
        <p>
          {
          product.map((product) => <Card className={css(styles.buttonCard)} name={product.name} price={product.price} 
          handleClick={() => openOptions(product)}/>)
          }
        </p>
        <div>{ options.length !== 0 ? 
          options.options.map(elem => <Button className={css(styles.button)} handleClick={() =>{ 
          const option = {...options, type: elem}; addOrder(option)}} title={elem}/>) : false
        }</div>
        {/* <div>{ extras.length !== 0 ? 
          extras.extras.map(elem => <Button className={css(styles.button)} handleClick={() =>{ 
          const extra = {...extras, type: elem}; addOrder(extra)}} title={elem}/>) : false
        }</div> */}
      </aside>
      <aside className={css(styles.order)}>
        {
        order.map((product, item) =>
        <Order key={item.id} Qnt={product.quantity} name={product.name} type={product.type ? product.type : ""} 
        price={product.price}/>)
        }
        <strong className={css(styles.sum)}>Total: R${total},00</strong>
        <Button className={css(styles.buttonSend)} handleClick={(order) => sendOrder} title="Enviar para Cozinha"/>
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

 buttonCard: {
    backgroundColor: '#77dd77',
    fontSize: '13px',
    fontWeight: 'bold', 
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    hover: { hover:{
      backgroundColor:'yellow'
    }
    },
    margin: '5px',
  },

  button: {
    backgroundColor: '#77dd77',
    fontSize: '13px',
    fontWeight: 'bold', 
    padding: '20px',
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    hover: {hover:{
      backgroundColor:'yellow'
    }
    },
    margin: '10px',
  },

  buttonSend: {
    backgroundColor: 'yellow',
    fontSize: '13px',
    fontWeight: 'bold', 
    padding: '13px',
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },

  card: {
    width: '40%',
    float: 'left',
    border: 'none',
    alignItems: 'center',
    margin: '20px 5,5% 0% 5.5%' ,
 },

  order: {
    margin: '2px 5.5% 0% 5.5%',
    width: '40%',
    float: 'left',
    border: 'none',
    alignItems: 'center',
    backgroundColor: '#1f231f',
    color: 'white',
    size: '100px',
    fontSize: '20px',
  },

  header:{
    margin: '2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'left',
  }
})