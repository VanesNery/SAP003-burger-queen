import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from "../components/util/firebaseUtils";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Order from "../components/Order";
import Historic from "../components/Historic";
import Exit from "../components/Exit";

export default function Hall() {
  const [menus, setMenus] = useState([]);
  const [menuBreak, setmenuBreak] = useState([]);
  const [menuLunch, setmenuLunch] = useState([]);
  const [order, setOrder] = useState([]);
  const [options, setproductOptions] = useState("");
  const [extras, setproductExtras] = useState("");
  const [clientName, setclientName] = useState("");
  const [selectProduct, setSelectProduct] = useState({});
  const [desk, setDesk] = useState(0);

  const refresh = {
    fadeAway: true,
    fadeAwayTimeout: 2000
  };

  useEffect(() => {
    const fireBreak = firebase
      .firestore()
      .collection("menu")
      .doc("rkDKptwgRbxstwJMPbLO")
      .collection("breakfast");
    const fireLunch = firebase
      .firestore()
      .collection("menu")
      .doc("rkDKptwgRbxstwJMPbLO")
      .collection("lunch");
    fireBreak.get().then(querySnapshot => {
      const product = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setmenuBreak(product);
    });
    fireLunch.get().then(querySnapshot => {
      const product = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setmenuLunch(product);
    });
  }, []);

  const product = menus === "breakfast" ? menuBreak : menuLunch;

  const addOrder = product => {
    const existingProduct = order.find(
      e =>
        e.name === product.name &&
        e.typeExtra === product.typeExtra &&
        e.typeOption === product.typeOption
    );
    if (existingProduct === undefined) {
      product.quantity = 1;
      setOrder([...order, product]);
    } else {
      product.quantity++;
      setOrder([...order]);
    }
    setproductExtras([]);
    setproductOptions([]);
  };

  const openOptions = product => {
    if (product.options.length !== 0) {
      setproductOptions(product);
    } else {
      setproductOptions([]);
    }
  };

  const openExtras = product => {
    if (product.extras.length !== 0) {
      setproductExtras(product);
    } else {
      setproductExtras([]);
    }
  };

  const removeProduct = product => {
    const existProduct = order.findIndex(item => item.name === product.name);
    const removeItem = order.filter(item => item.name !== product.name);
    if (product.quantity === 1) {
      setOrder([...removeItem]);
    } else {
      order[existProduct].quantity += -1;
      setOrder([...order]);
    }
  };

  const addOptionExtra = product => {
    if (product.options) {
      setSelectProduct({ ...product });
      openOptions(product);
    } else if (product.extras) {
      openExtras(product);
    } else {
      addOrder(product);
    }
  };

  const sendOrder = () => {
    if ((desk && clientName) === 0) {
      growl.warning({
        text: "Preencha o nº da mesa e o nome do cliente!",
        ...refresh
      });
    } else if (order.length === 0) {
      growl.warning({
        text: "Adicione produtos ao pedido",
        ...refresh
      });
    } else {
      const clientOrder = {
        name: clientName,
        desk: desk,
        time: new Date().getTime(),
        itens: order,
        total: total,
        status: "Pendente"
      };
      firebase
        .firestore()
        .collection("orders")
        .add(clientOrder);
      setclientName("");
      setDesk(0);
      setOrder([]);
      growl.success({ text: "Pedido enviado para Cozinha", ...refresh });
    }
  };

  const total = order.reduce((acc, product) => {
    const additional = product.typeExtra ? 1 : 0;
    return acc + (product.price + additional) * product.quantity;
  }, 0);

  return (
    <main>
      <header className={css(styles.header)}>
        <Historic />
        <img
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Aréa do Garçom"
        />
        <Exit />
      </header>
      <h3 className={css(styles.h3)}>Aréa do Garçom</h3>
      <aside className={css(styles.card)}>
        <fieldset className={css(styles.input)}>
          <legend>Pedido</legend>
          <ul>
            <li className={css(styles.liInput)}>
              <label className={css(styles.labelInput)}> Cliente:</label>
              <Input
                value={clientName}
                title="Cliente"
                type="text"
                onChange={e => setclientName(e.target.value)}
              />
            </li>
            <li className={css(styles.liInput)}>
              <label className={css(styles.labelInput)}> Nº da Mesa:</label>
              <Input
                value={desk}
                title="Nº da Mesa"
                type="number"
                min="0"
                onChange={e => setDesk(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <Button
          className={css(styles.button)}
          handleClick={() => setMenus("breakfast")}
          title="Café da Manhã"
        />
        <Button
          className={css(styles.button)}
          handleClick={() => setMenus("lunch")}
          title="Resto do Dia"
        />
        {product.map(product => (
          <Card
            className={css(styles.buttonCard)}
            {...product}
            handleClick={() => {
              addOptionExtra(product);
            }}
          />
        ))}
        <div>
          {options.length !== 0
            ? options.options.map(elem => (
                <Button
                  className={css(styles.buttonOption)}
                  handleClick={() => {
                    setSelectProduct({ ...selectProduct, typeOption: elem });
                    openExtras(selectProduct);
                  }}
                  title={elem}
                />
              ))
            : false}
        </div>
        <div>
          {extras.length !== 0
            ? extras.extras.map(elem => (
                <Button
                  className={css(styles.buttonExtra)}
                  handleClick={() => {
                    selectProduct.typeExtra = elem.name;
                    addOrder(selectProduct);
                  }}
                  title={elem.name}
                  price={" R$: " + elem.price + ",00"}
                />
              ))
            : false}
        </div>
      </aside>
      <aside className={css(styles.order)}>
        {order.map((product, item) => (
          <Order key={item.name} {...product} onClick={removeProduct} />
        ))}
        <strong className={css(styles.strongTotal)}>
          {" "}
          Total: R${total},00
        </strong>
        <Button
          className={css(styles.buttonSend)}
          handleClick={() => sendOrder(order)}
          title="Enviar para Cozinha"
        />
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({
  input: {
    display: "grid",
    fontSize: "15px",
    color: "white",
    listStyle: "none",
    margin: "0vw 0vw 1vw"
  },

  liInput: {
    margin: "0.1vw 1vw 2vw 1vw",
    float: "left",
    listStyle: "none"
  },

  labelInput: {
    width: "10vw",
    margin: "0vw 2vw -2.3vw -6vw",
    float: "left",
    padding: "0.5vw"
  },

  button: {
    backgroundColor: "#77dd77",
    fontSize: "1.8vw",
    fontWeight: "bold",
    padding: "0.5vw",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "auto 2vw auto 2vw",
    ":active": {
      backgroundColor: "yellow"
    }
  },

  buttonCard: {
    backgroundColor: "#77dd77",
    fontSize: "1.3vw",
    fontWeight: "bold",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw 0.5vw auto 0.5vw"
  },

  buttonOption: {
    backgroundColor: "#DB4E4E",
    fontSize: "1.3vw",
    fontWeight: "bold",
    padding: "1vw",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw"
  },

  buttonExtra: {
    backgroundColor: "#1E90FF",
    fontSize: "1.3vw",
    fontWeight: "bold",
    padding: "1vw",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw"
  },

  buttonSend: {
    backgroundColor: "yellow",
    fontSize: "1.3vw",
    fontWeight: "bold",
    padding: "1vw",
    borderRadius: "5vw",
    cursor: "pointer",
    margin: "1vw"
  },

  card: {
    width: "45%",
    float: "left",
    alignItems: "center",
    margin: "-1% 1.5% 0% 1.5%"
  },

  order: {
    margin: "-1% 0.5% 0% 3.5%",
    width: "45%",
    float: "left",
    alignItems: "center",
    backgroundColor: "#1f231f",
    color: "white",
    size: "100vw",
    padding: "1vw"
  },

  strongTotal: {
    fontSize: "1.2em"
  },

  header: {
    margin: "-1vw -1vw",
    height: "10vw",
    padding: "0.8vw",
    display: "flex",
    justifyContent: "space-between"
  },

  h3: {
    display: "flex",
    justifyContent: "center",
    color: "#e85e1a"
  }
});
