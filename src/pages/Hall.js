import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import db from '../components/util/firebaseUtils';
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
  const [clientName, setclientName] = useState("");
  const [desk, setDesk] = useState(0);

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
    if (existingProduct === undefined) {
      product.quantity = 1;
      setOrder([...order, product])
    }
    else if (existingProduct.type === product.type) {
      existingProduct.quantity += 1;
      setOrder([...order])
    }
    else if (existingProduct.type !== product.type) {
      product.quantity = 1;
      setOrder([...order, product])
    }
    else {
      product.quantity += 1;
      setOrder([...order])
    }
  }

  const openOptions = (product) => {
    if (product.options) {
      setproductOptions(product);
    } else {
      setproductOptions([]);
      addOrder(product)
    }
  }

 const removeProduct = (product) => {
    const existProduct = order.findIndex(item => item.name === product.name);
    const removeItem = order.filter(item => item.name !== product.name);
    if (product.quantity === 1) {
      setOrder([...removeItem]);
    } else {
      order[existProduct].quantity += -1;
      setOrder([...order]);
    }
  }

  const sendOrder = () => {
    if ((desk && clientName) === 0) {
      alert('Preencha o nº da mesa e o nome do cliente!');
    } else if (order.length === 0) {
      alert('Adicione produtos ao pedido');
    } else {
      const clientOrder ={
        name: clientName,
        desk: desk,
        time: new Date(),
        itens: order,
        total: total,
        status: "Pendente",
      };
      db.collection('orders').add(clientOrder);
      alert('Pedido enviado com sucesso');
      setclientName("")
      setDesk(0)
      setOrder([])
      };
    };

  const total = order.reduce((acc, product) => { return acc + (product.price * product.quantity) }, 0);
  const product = menus === "breakfast" ? menuBreak : menuLunch;

  return (
    <main>
      <header className={css(styles.header)}>
        <img src='../images/Burguer Queen.png' alt='Burguer Queen - Aréa do Garçom' /><br /><br />
        Aréa do Garçom
        </header>
      <aside className={css(styles.card)}>
        <fieldset className={css(styles.input)}>Pedido
        <ul className={css(styles.input)}>Cliente: <Input value={clientName} title="Cliente" type="text" 
        onChange={(e) => setclientName(e.target.value)} /></ul>
        <ul className={css(styles.input)}>Nº da Mesa: <Input value={desk} title="Nº da Mesa" type="number" 
        min="0" onChange={(e) => setDesk(e.target.value)} /></ul>
        </fieldset>
        <Button className={css(styles.button)} handleClick={() => setMenus("breakfast")} title="Café da Manhã"/>
        <Button className={css(styles.button)} handleClick={() => setMenus("lunch")} title="Resto do Dia" />
        {
        product.map((product) => <Card className={css(styles.buttonCard)} name={product.name} 
        price={product.price} handleClick={() => openOptions(product)} />)
        }
        <div>{
        options.length !== 0 ?
        options.options.map(elem => <Button className={css(styles.buttonOption)} handleClick={() => {
        const option = { ...options, type: elem }; addOrder(option)}} title={elem} />) : false
        }
        </div>
      </aside>
      <aside className={css(styles.order)}>
        {
        order.map((product, item) => <Order key={item.name} quantity={product.quantity} name={product.name} 
        type={product.type ? product.type : ""} onClick={removeProduct}/>)
        }
        <strong> Total: R${total},00</strong>
        <Button className={css(styles.buttonSend)} handleClick={() => sendOrder(order)} 
        title="Enviar para Cozinha" />
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 'auto auto 1vw',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    fontSize: '15px',
    color: 'white',
  },

  button: {
    backgroundColor: '#77dd77',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '1vw',
    border: 'none',
    borderRadius: '1vw',
    cursor: 'pointer',
    margin: 'auto 3vw auto 6vw',
    ':active':{
      backgroundColor: 'yellow',
    },
  },

  buttonCard: {
    backgroundColor: '#77dd77',
    fontSize: '11px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '1vw',
    cursor: 'pointer',
    margin: '1vw auto auto 1vw',
  },

  buttonOption: {
    backgroundColor: 'red',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '1vw', 
    border: 'none',
    borderRadius: '1vw',
    cursor: 'pointer',
    margin: '1vw auto auto 1vw',
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
    alignItems: 'center',
    margin: '20px 5,5% 0% 5.5%',
  },

  order: {
    margin: '2px 5.5% 0% 5.5%',
    width: '40%',
    float: 'left',
    border: 'none',
    alignItems: 'center',
    backgroundColor: '#1f231f',
    color: 'white',
    size: '100vw',
    fontSize: '1.5vw',
  },

  header: {
    margin: '2px auto',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
  }
})