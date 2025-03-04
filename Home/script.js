let headerElement = document.querySelector("header");
let textoBemVindo = document.createTextNode(`Seja bem Vindo, ${localStorage.getItem("Nome_Responsavel")}!`);
let h2Element = document.createElement("h2");
h2Element.appendChild(textoBemVindo);
headerElement.appendChild(h2Element);