import React, {useState, useEffect} from 'react';
import firebase from './components/util/firebaseUtils';

  function Hall() {
  // const [cardapio, setCardapio] = useState('breakfast')
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
  
    // function menuClick (){
    //   if (cardapio === "breakfast"){
    //     setCardapio("lunch")
    //   } else{
    //     setCardapio("breakfast")
    //   }
    // }
   
    return( 
   <div>
   <h2>Burguer Queen - Garçom</h2>
   <h4>Café da Manhã</h4>
    {menuBreak.map((product)=> <button key = {product.id}>{product.name}  R$:{product.price}</button>)}
   <h4>Resto do Dia</h4>
    {menuLunch.map((product)=> <button key = {product.id}>{product.name}  R$:{product.price}</button>)}
   </div>
   );
}

export default Hall