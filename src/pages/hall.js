import React, {useState, useEffect} from 'react';
import firebase from '../components/util/firebaseUtils';

  function Hall() {
  const [cardapio, setCardapio] = useState([])
  const [menuBreak, setmenuBreak] = useState([])
  const [menuLunch, setmenuLunch] = useState([])

  useEffect(()=> {
    let fireBreak = firebase.firestore().collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('breakfast');
    let fireLunch = firebase.firestore().collection('menu').doc('rkDKptwgRbxstwJMPbLO').collection('lunch');
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
  },[]
  );
  
    function menuClick (props){
      if (props === "breakfast"){
        setCardapio(menuBreak.map((product)=> <button key = {product.id}>{product.name}  R${product.price},00</button>))
      } else{
        setCardapio(menuLunch.map((product)=> <button key = {product.id}>{product.name}  R${product.price},00</button>))
      }
      return (cardapio)
    }
   
    return( 
   <main>
   <h2>Burguer Queen - Garçom</h2>
   <ul>
   <button onClick={()=> menuClick('breakfast')}>Café da Manhã</button>
   <button onClick={()=> menuClick('lunch')}>Resto do Dia</button>
   </ul>
   <p>{cardapio}</p>
   </main>
   );
}

export default Hall