function Button(props) {
  const template = `
    <button 
    data-id="${props.dataId}"
    id="${props.id}"
    class="${props.class} primary-button"
    onclick="button.handleClick(event, ${props.onClick})" >${props.title}
    <i class="${props.icone}"></i>
    </button>
  `;
  return template;
};

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event.target.textContent);
  },
  component: Button,
};

export default Button;