import React, {useState, useEffect} from 'react';
import firebase from '../components/util/firebaseUtils';


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
   <button >{menuBreak.map((product)=> <div key = {product.id}>{product.name}  R$:{product.price}</div>)}Café da Manhã</button>
   {/* {menuLunch.map((product)=> <div key = {product.id}>{product.name}  R$:{product.price}</div>)} */}
   </div>
   );
}

export default Hall