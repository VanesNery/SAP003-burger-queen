import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Order(props) {
  return (
    <li className={css(styles.li)}>
      <p className={css(styles.txt)}>
        {props.quantity + "x"} {props.name} {props.typeOption} {props.typeExtra}
        <button
          className={css(styles.button)}
          onClick={() => props.onClick(props)}
        />
      </p>
    </li>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundImage: 'url("../images/trash.png")',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    border: "none",
    size: "1vw",
    cursor: "pointer",
    float: "right",
    width: "3.5vw",
    height: "3.5vw",
    margin: "-1vw 3vw 0vw 0vw"
  },

  li: {
    width: "44.5vw",
    height: "5vw",
    listStyle: "none"
  },

  txt: {
    fontSize: "1em"
  }
});
