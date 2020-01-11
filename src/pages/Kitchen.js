import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import db from "../components/util/firebaseUtils";
import Button from "../components/Button";
import OrderKitchen from "../components/OrderKitchen";

export default function Kitchen() {
  const [menus, setMenus] = useState([]);
  const [menuPending, setmenuPending] = useState([]);
  const [menuReady, setmenuReady] = useState([]);
  
  useEffect(() => {
    db.collection("orders")
      .where("status", "==", "Pendente")
      .get()
      .then(querySnapshot => {
        const order = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setmenuPending(order);
        console.log(order);
      });
    db.collection("orders")
      .where("status", "==", "Pronto")
      .get()
      .then(querySnapshot => {
        const order = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setmenuReady(order);
      });
  }, []);

  const orders = menus === "Pendente" ? menuPending : menuReady;

  const calculateTime = orders => {
    let date = new Date().getTime() - orders;
    return date;
  };

  const updateStatus = order => {
    if (order.status === "Pendente") {
      order.status = "Pronto";
      db.collection("orders")
        .doc(order.id)
        .update({
          status: "Pronto",
          finalTime: new Date().getTime()
        });

      const filter = menuPending.filter(ticket => ticket !== order);
      setmenuReady([...menuReady, order]);
      setmenuPending([...filter]);
    }
  };

  return (
    <main>
      <header className={css(styles.header)}>
        <img
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Aréa do Cozinheiro"
        />
        Aréa do Cozinheiro
      </header>
      <Button
        className={css(styles.button)}
        handleClick={() => setMenus("Pendente")}
        title="Pedidos Pendentes"
      />
      <Button
        className={css(styles.button)}
        handleClick={() => setMenus("Pronto")}
        title="Pedidos Prontos"
      />
      <section>
        {orders.map(orders => (
          <OrderKitchen
            className={css(styles.card)}
            name={"Cliente: " + orders.name}
            desk={"Mesa: " + orders.desk}
            itens={orders.itens.map(i => (
              <span>
                {i.quantity + "x "}
                {i.name}
                <br />
              </span>
            ))}
            timestamp={calculateTime(orders.time)}
            status={"Status: " + orders.status}
            title={
              orders.status === "Pendente" ? "Pedido Pronto" : "Pedido Entregue"
            }
            onClick={() => updateStatus(orders)}
          />
        ))}
      </section>
    </main>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    fontSize: "2vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "3vw",
    cursor: "pointer",
    margin: "-1vw 2vw auto 10vw",
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
    padding: "2vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw"
  },

  buttonExtra: {
    backgroundColor: "blue",
    fontSize: "0.9vw",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    margin: "1vw auto auto 1vw"
  },

  card: {
    width: "40vw",
    float: "left",
    border: "solid",
    borderRadius: "1vw",
    alignItems: "center",
    padding: "1vw",
    color: "white",
    margin: "1vw 1.5vw 0vw 1.5vw"
  },

  order: {
    margin: "-1vw 1.5vw 0vw 1.5vw",
    width: "40vw",
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
    alignItems: "center"
  }
});
