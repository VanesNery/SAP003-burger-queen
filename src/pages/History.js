import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import db from "../components/util/firebaseUtils";
import Button from "../components/Button";
import OrderKitchen from "../components/OrderKitchen";

export default function Kitchen() {
  const [menus, setMenus] = useState([]);
  const [menuReady, setmenuReady] = useState([]);
  const [menuorderHistory, setmenuorderHistory] = useState([]);
  
  useEffect(() => {
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
    db.collection("orders")
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

  const orders = menus === "Pronto" ? menuReady : menuorderHistory;

  const updateStatus = order => {
    if (order.status === "Pronto") {
      order.status = "Entregue";
      db.collection("orders")
        .doc(order.id)
        .update({
          status: "Entregue",
          finalTime: new Date().getTime()
        });

      const filter = menuReady.filter(ticket => ticket !== order);
      setmenuorderHistory([...menuReady, order]);
      setmenuReady([...filter]);
    }
  };

  const calculateTime = orders => {
    let date = new Date(orders);
    let time = date.toLocaleString();
    return time;
  };
  
  return (
    <main>
      <header className={css(styles.header)}>
        <img
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Histórico de Pedidos"
        />
        Histórico de Pedidos
      </header>
      <Button
        className={css(styles.button)}
        handleClick={() => setMenus("Pronto")}
        title="Pedidos Prontos"
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
                {i.quantity + "x "}
                {i.name}
                <br />
              </span>
            ))}
            time={
                orders.status === "Pronto" ? calculateTime(orders.finalTime) : calculateTime(orders.time)
            }
            status={"Status: " + orders.status}
            title={
              orders.status === "Pronto" ? "Pedido Pronto" : "Pedido Ok"
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
    width: "40vw",
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