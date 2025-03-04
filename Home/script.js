//título
let headerElement = document.querySelector("header");
let textoBemVindo = document.createTextNode(`Seja bem Vindo, ${localStorage.getItem("Nome_Responsavel")}!`);
let h2Element = document.createElement("h2");
h2Element.appendChild(textoBemVindo);
headerElement.appendChild(h2Element);

//logout
let logoutElement = document.getElementById("sair");

//dados
let nomeInputElement = document.getElementById("Input_nome");
let deptoInputElement = document.getElementById("departamento");
let horaInputElement = document.getElementById("Input_horas");
let adicionarElement = document.getElementById("adicionar");

//analisar os dados
let calcularElement = document.getElementById("calcular");
let resgistros = JSON.parse(localStorage.getItem("Dados_Funcionario")) || alert("Não há nenhum dado armazenado!");; // para armazenar informações do JSON;
let local = [];
let local_salario = [];
let i = 0;

//para sair da home
function saindo(){
    alert("Você saiu!");
    window.location.href = "/Index/index.html";
    localStorage.clear("Nome_Responsavel");
}

//para incluir os funcionários
function incluir(){

    let funcionario = {
        nome: nomeInputElement.value,
        departamento: deptoInputElement.value,
        horas: horaInputElement.value
    }

    if( funcionario.nome == '' || funcionario.departamento == '' || funcionario.hora == ''){
        alert("Há campos sem preencher!");
        console.log(local);
    }else{

        if(funcionario.departamento == 1 || funcionario.departamento == 2){
            if(Number(funcionario.horas) <= 0){
                console.log(funcionario.horas);
                alert("Hora inválida!");
                horaInputElement.value = '';
            }else{
                console.log(funcionario.horas);
                local[i] = funcionario;

                try{
                    localStorage.setItem("Dados_Funcionario", JSON.stringify(local));                    
                    console.log(local);
                    alert("Adicionado com Sucesso!");
                    nomeInputElement.value = '';
                    deptoInputElement.value = '';
                    horaInputElement.value = '';
                }catch(e){
                    alert("algo deu errado!");
                }
                i++;
            }
        }else{
            alert("O seu departamento está incorreto. Somente opção 1 ou 2!");
            deptoInputElement.value = '';
        }      
    }
}

function tabela_salarial(){
   if(resgistros.length == 5){
        console.log(resgistros);
        calculo_salario_base();
   }else{
        alert("Você deve adicionar no mínimo 5 funcionários!");
   }
}

function calculo_salario_base(){
    let salario;
    let conversor_depto;
    let conversor_horas;
    for(i = 0; i < resgistros.length; i++){
        conversor_depto = Number(resgistros[i].departamento)

        if(conversor_depto == 2){
            conversor_horas = Number(resgistros[i].horas);
            salario = conversor_horas*22;
            local_salario[i] = salario;
        }
        if(conversor_depto == 1){
            conversor_horas = Number(resgistros[i].horas);
            salario = conversor_horas*12;
            local_salario[i] = salario;
        }
    }
    console.log(local_salario);
}

function hora_extra(){
    
}

calcularElement.onclick = tabela_salarial;
adicionarElement.onclick = incluir;
logoutElement.onclick = saindo;