import React, { useState, useEffect } from 'react';
import {StyleSheet, css} from 'aphrodite';
import  db from '../components/util/firebaseUtils';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Order from '../components/Order';

export default function Hall() {
  const [menus, setMenus] = useState([]);
  const [menuBreak, setmenuBreak] = useState([]);
  const [menuLunch, setmenuLunch] = useState([]);
  const [order, setOrder] = useState([]);
  const [options, setproductOptions] = useState([]);
  const [client, setClient] = useState('');
  const [desk, setDesk] = useState('');

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

  const addOrder = (product) => {
    const existingProduct = order.filter((e) => e.name === product.name)[0];
    if (existingProduct === undefined){
      product.quantity = 1;
      setOrder([...order, product])
    }
    else if (existingProduct.type === product.type){
      existingProduct.quantity += 1;
      setOrder([...order])
    }
    else if (existingProduct.type !== product.type){
      product.quantity = 1;
      setOrder([...order, product])
    }
    else{
      product.quantity += 1;
      setOrder([...order])
    }
  }

  const openOptions = (product) => {
    if (product.options){
      setproductOptions(product);
    } else {
      setproductOptions([]);
      addOrder(product)
    }
  }

 const sendOrder = () => {    
      if((desk && client) === ''){
        alert('Preencha o nº da mesa e o nome do cliente!')
      }else if(order.length === 0) {
        alert('Adicione produtos ao pedido')
        }else{
        db.collection('orders').add(
          {
            Name: client,
            Desk: desk,
            Itens: order,
            Total: total,
          })
          .then(() => {
            alert('Pedido enviado com sucesso');
            setDesk();
            setClient();
            setOrder([]);
          });
      }
  };

  const total = order.reduce(function (acc, product) {return acc + (product.price * product.quantity)}, 0);
  const product = menus === "breakfast" ? menuBreak : menuLunch;

  return (
    <main>
        <header className={css(styles.header)}>
        <img src='../Burguer Queen.png' alt='Burguer Queen - Aréa do Garçom' width='150' /><br /><br />Area do Garçom
        </header>
        <aside className={css(styles.card)}>
        <fieldset>Pedido 
        <ul>Cliente: <Input className={css(styles.input)} value={client} title="Cliente" type="text" onChange={(e) => setClient(e.target.value)}/></ul>
        <ul>Nº da Mesa: <Input className={css(styles.input)} value={desk} title="Nº da Mesa" type="number" onChange={(e) => setDesk(e.target.value)}/></ul>
        </fieldset>
        <br />
        <Button className={css(styles.button)} handleClick={() => setMenus("breakfast")} title="Café da Manhã" />
        <Button className={css(styles.button)} handleClick={() => setMenus("lunch")} title="Resto do Dia" />
        <br />
          {
          product.map((product) => <Card className={css(styles.buttonCard)} name={product.name} price={product.price}
          handleClick={() => openOptions(product)}/>)
          }
        <div>{ options.length !== 0 ? 
        options.options.map(elem => <Button className={css(styles.button)} handleClick={() =>{ 
          const option = {...options, type: elem}; addOrder(option)}} title={elem}/>) : false
        }
        </div>
      </aside>
      <aside className={css(styles.order)}>
        {
        order.map((product, item) =>
        <Order key={item.name} quantity={product.quantity} name={product.name} type={product.type ? product.type : ""} />)
        }
        <strong className={css(styles.sum)}>Total: R${total},00</strong>
        <Button className={css(styles.buttonSend)} handleClick={() => sendOrder(order)} title="Enviar para Cozinha"/>
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
    fontSize: '11px',
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
    fontSize: '11px',
    fontWeight: 'bold', 
    padding: '11px',
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    hover: {hover:{
      backgroundColor:'yellow'
    }
    },
    margin: '5px',
  },

  buttonSend: {
    backgroundColor: 'yellow',
    fontSize: '11px',
    fontWeight: 'bold', 
    padding: '10px',
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '8px',
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
    justifyContent: 'center',
  }
})