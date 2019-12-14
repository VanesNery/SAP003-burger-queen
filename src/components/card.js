import Button from 'button.js';
import Input from 'input.js';

function Card() {
  const template = `
    <div class='card'>
    <ul class="card-menu" id="menu">
      <li>${Input({ class: "name", title: "Digite o nome do Cliente", type:"text" })}</li>
      <li>${Input({ class: "name", title: "Digite o numero da mesa", type:"number" })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>‍${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
      <li>${Button({ class: "", title: "", onClick: '' })}</li>
    </ul>
    <div>
    `;
  return template;
};

export default Card;