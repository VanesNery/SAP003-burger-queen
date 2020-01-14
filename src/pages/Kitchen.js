import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../components/util/firebaseUtils";
import Button from "../components/Button";
import OrderKitchen from "../components/OrderKitchen";
import Exit from "../components/Exit";

export default function Kitchen() {
  const [menus, setMenus] = useState([]);
  const [menuPending, setmenuPending] = useState([]);
  const [menuReady, setmenuReady] = useState([]);
  const [menuorderHistory, setmenuorderHistory] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .where("status", "==", "Pendente")
      .get()
      .then(querySnapshot => {
        const order = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setmenuPending(order);
      });
    firebase
      .firestore()
      .collection("orders")
      .where("status", "==", "Entregue")
      .get()
      .then(querySnapshot => {
        const order = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setmenuorderHistory(order);
      });
  }, []);

  const orders = menus === "Pendente" ? menuPending : menuorderHistory;

  const calculateTime = orders => {
    let date = new Date(orders);
    let time = date.toLocaleString();
    return time;
  };

  const updateStatus = order => {
    if (order.status === "Pendente") {
      order.status = "Pronto";
      firebase
      .firestore()
        .collection("orders")
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
      <Exit />
      <Button
        className={css(styles.button)}
        handleClick={() => setMenus("Pendente")}
        title="Pedidos Pendentes"
      />
      <Button
        className={css(styles.button)}
        handleClick={() => setMenus("Entregue")}
        title="Historico de Pedidos"
      />
      <section>
        {orders.map(orders => (
          <OrderKitchen
            className={css(styles.card)}
            name={"Cliente: " + orders.name}
            desk={"Mesa: " + orders.desk}
            itens={orders.itens.map(i => (
              <span>
                <p>
                  {i.quantity + "x "}
                  {i.name}
                </p>
              </span>
            ))}
            time={"Pedido Feito: " + calculateTime(orders.time)}
            finalTime={"Pedido Pronto: " + calculateTime(orders.finalTime)}
            status={"Status: " + orders.status}
            title={
              orders.status === "Pendente" ? "Pedido Pendente" : "Pedido Finalizado"
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

  card: {
    minWidth: "40vw",
    minHeight: "50vw",
    width: "35vw",
    height: "38vw",
    float: "left",
    border: "solid",
    borderRadius: "1vw",
    alignItems: "center",
    padding: "1vw",
    color: "white",
    margin: "1vw 1.5vw 0vw 1.5vw"
  },

  header: {
    margin: "1.5vw auto",
    padding: "0.8vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
