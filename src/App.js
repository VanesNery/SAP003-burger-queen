import React, {useState} from 'react';
import firebase from './components/util/firebaseUtils';

firebase.firestore().collection('.menu')

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Contador</button>
    </div>
  );
}

export default App;
