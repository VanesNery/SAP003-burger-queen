import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import db from "../components/util/firebaseUtils";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Order from "../components/Order";

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

  useEffect(() => {
    const fireBreak = db
      .collection("menu")
      .doc("rkDKptwgRbxstwJMPbLO")
      .collection("breakfast");
    const fireLunch = db
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
    }
    else {
      product.quantity++;
      setOrder([...order]);
    }
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
      alert("Preencha o nº da mesa e o nome do cliente!");
    } else if (order.length === 0) {
      alert("Adicione produtos ao pedido");
    } else {
      const clientOrder = {
        name: clientName,
        desk: desk,
        time: new Date(),
        itens: order,
        total: total,
        status: "Pendente"
      };
      db.collection("orders").add(clientOrder);
      alert("Pedido enviado com sucesso");
      setclientName("");
      setDesk(0);
      setOrder([]);
    }
  };

  const total = order.reduce((acc, product) => {
    const additional = product.typeExtra ? 1 : 0;
    return acc + (product.price + additional) * product.quantity;
  }, 0);

  return (
    <main>
      <header className={css(styles.header)}>
        <img
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Aréa do Garçom"
        />
        Aréa do Garçom
      </header>
      <aside className={css(styles.card)}>
        <fieldset className={css(styles.input)}>
          Pedido
          <ul className={css(styles.input)}>
            Cliente:{" "}
            <Input
              value={clientName}
              title="Cliente"
              type="text"
              onChange={e => setclientName(e.target.value)}
            />
          </ul>
          <ul className={css(styles.input)}>
            Nº da Mesa:{" "}
            <Input
              value={desk}
              title="Nº da Mesa"
              type="number"
              min="0"
              onChange={e => setDesk(e.target.value)}
            />
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
                  price={' R$: '+elem.price+',00'}
                />
              ))
            : false}
        </div>
      </aside>
      <aside className={css(styles.order)}>
        {order.map((product, item) => (
          <Order
            key={item.name}
            {...product}
            onClick={removeProduct}
          />
        ))}
        <strong> Total: R${total},00</strong>
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
    margin: "auto auto 1vw",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    fontSize: "15px",
    color: "white"
  },

  button: {
    backgroundColor: "#77dd77",
    fontSize: "1vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "auto 3vw auto 6vw",
    ":active": {
      backgroundColor: "yellow"
    }
  },

  buttonCard: {
    backgroundColor: "#77dd77",
    fontSize: "0.8vw",
    fontWeight: "bold",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw"
  },

  buttonOption: {
    backgroundColor: "red",
    fontSize: "0.9vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw",
  },

  buttonExtra: {
    backgroundColor: "blue",
    fontSize: "0.9vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw",
  },

  buttonSend: {
    backgroundColor: "yellow",
    fontSize: "0.8vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "5vw",
    cursor: "pointer",
    margin: "1vw"
  },

  card: {
    width: "40%",
    float: "left",
    alignItems: "center",
    margin: "-1% 1.5% 0% 1.5%"
  },

  order: {
    margin: "-1% 1.5% 0% 1.5%",
    width: "40%",
    float: "left",
    border: "none",
    alignItems: "center",
    backgroundColor: "#1f231f",
    color: "white",
    size: "100vw",
    fontSize: "1.5vw"
  },

  header: {
    margin: "1.5vw auto",
    padding: "0.8vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
