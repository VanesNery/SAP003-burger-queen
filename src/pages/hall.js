import React, { useState, useEffect } from 'react';
import firebase from '../components/util/firebaseUtils';
import Button from '../components/button';
import Input from '../components/input';
import Card from '../components/card';

export default function Hall() {
  const [cardapio, setCardapio] = useState([])
  const [menuBreak, setmenuBreak] = useState([])
  const [menuLunch, setmenuLunch] = useState([])

  useEffect(() => {
    const fireBreak = firebase.firestore().collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('breakfast');
    const fireLunch = firebase.firestore().collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('lunch');
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

  function menuClick(props) {
    if (props === "breakfast") {
      setCardapio(menuBreak.map((product) => <Card name={product.name} price={product.price} 
      handClick={() => console.log(product) } />))
    } else {
      setCardapio(menuLunch.map((product) => <Card name={product.name} price={product.price} 
      handClick={() => console.log(product) } />))
    }
    return (cardapio)
  }

  return (
    <main>
      <section>
      <header>
        <h2>Burguer Queen - Garçom</h2>
        <img src='../Logo_BQ.png' alt='' />
      </header>
      <fieldset>Pedido
        <ul>Cliente: <Input class="input-cliente" placeholder="Nome" title="Cliente" type="text" /></ul>
        <ul>Nº da Mesa: <Input placeholder="Mesa:" title="Nº da Mesa" type="number" min="0" /></ul>
      </fieldset>
      <br></br>
      <Button handleClick={(e) => { menuClick("breakfast"); e.preventDefault(); }} title="Café da Manhã" />
      <Button handleClick={(e) => { menuClick("lunch"); e.preventDefault(); }} title="Resto do Dia" />
      <p>{cardapio}</p>
      </section>
    </main>
  );
}