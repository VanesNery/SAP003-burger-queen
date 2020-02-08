import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../components/util/firebaseUtils";
import Button from "../components/Button";
import OrderKitchen from "../components/OrderKitchen";
import Back from "../components/Back";

export default function History() {
  const [menus, setMenus] = useState([]);
  const [menuReady, setmenuReady] = useState([]);
  const [menuorderHistory, setmenuorderHistory] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .get()
      .then(querySnapshot => {
        const order = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setmenuReady(order);
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

  const orders = menus === "Pronto" ? menuReady : menuorderHistory;

  const updateStatus = order => {
    if (order.status === "Pronto") {
      order.status = "Entregue";
      firebase
        .firestore()
        .collection("orders")
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
    const date = new Date(orders).toLocaleString();
    return date;
  };

  return (
    <main>
      <header className={css(styles.header)}>
        <img
          className={css(styles.img)}
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Histórico de Pedidos"
        />
        <Back />
      </header>
      <h3 className={css(styles.h3)}>Histórico de Pedidos</h3>
      <section className={css(styles.section)}>
        <div className={css(styles.divButton)}>
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
        </div>
        {orders.map((orders, item) => (
          <OrderKitchen
            key={item.name}
            className={css(styles.card)}
            name={"Cliente: " + orders.name}
            desk={"Mesa: " + orders.desk}
            itens={orders.itens.map(i => (
              <span>
                <p>
                  {i.quantity + "x "}
                  {(i.name === "Hambúrguer Simples" || i.name === "Hambúrguer Duplo")
                  ? i.name +" "+i.typeOption +" "+i.typeExtra
                  : i.name}
                </p>
              </span> 
            ))}
            time={"Pedido Feito: " + calculateTime(orders.time)}
            finalTime={"Pedido Pronto: " + calculateTime(orders.finalTime)}
            status={"Status: " + orders.status}
            title={
              orders.status === "Pronto"
                ? "Pedido Entregue ?"
                : "Pedido Finalizado"
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
    borderRadius: "3vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    } 
  },

  buttonExit: {
    backgroundColor: "#77dd77",
    fontWeight: "bold",
    padding: "0.5vw",
    borderRadius: "1vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  },

  card: {
    width: "40vw",
    margin:"1% 3%",
    float: "left",
    minHeight: "40vw",
    border: "solid",
    borderRadius: "1vw",
    alignItems: "center",
    padding: "1vw",
    color: "white",
    boxShadow: "0vw 1vw 5vw #FFF"
  },

  header: {
    padding: "0.8vw",
    margin: "-1vw -1vw"
  },

  img: {
    margin: "0 auto",
    float: "none",
    marginLeft: "40vw"
  },

  h3: {
    display: "flex",
    justifyContent: "center",
    color: "#e85e1a"
  },

  section: {
    width: "100%"
  },

  divButton:{
    display:"flex",
    justifyContent:"space-around"
  }
});
