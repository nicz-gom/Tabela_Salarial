let nomeElement = document.getElementById("nome");
let botaoElement = document.querySelector("button");

function acesso(event){
    let registro = nomeElement.value;
    if(registro == ''){
        alert("Preencha o campo!");
    }else{
        alert(`Olá, ${registro}`);
        localStorage.setItem("Nome_Responsavel", registro);
        window.location.href = "/Home/home.html";
        event.preventDefault();
    }
}

botaoElement.onclick = acesso;