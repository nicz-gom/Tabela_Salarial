//título
let headerElement = document.querySelector("header");
let textoBemVindo = document.createTextNode(`Seja bem Vindo, ${localStorage.getItem("Nome_Responsavel")}!`);
let h2Element = document.createElement("h2");
h2Element.style = "color: rgb(58, 226, 184);"
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
let local = [];
let resgistros; 
let local_salario = [];
let i = 0;
let aux_i;

aux_i = JSON.parse(localStorage.getItem("Quant_Funcionario"));

//para sair da home
function saindo(){
    let aux = prompt("Você deseja sair? 1 - sim/ 2 - não!");
    if(Number(aux) == 1){
        alert("Você saiu!");
        window.location.href = "/Index/index.html";
        localStorage.setItem("Nome_Responsavel", '');
    }
    if(Number(aux) == 2){
        alert("Vai continuar o trabalho!");
    }
}

//para incluir os funcionários
function incluir(){

    let funcionario = {
        nome: nomeInputElement.value,
        departamento: deptoInputElement.value,
        horas: horaInputElement.value
    }

    if( funcionario.nome == '' || funcionario.departamento == '' || funcionario.horas == ''){
        alert("Há campos sem preencher!");
        console.log(local);
    }else{

        if(funcionario.departamento == 1 || funcionario.departamento == 2){
            if(Number(funcionario.horas) <= 0){
                alert("Hora inválida!");
                horaInputElement.value = '';
            }else{
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
                
                //será para validar se há alguém no localStorage ou não
                localStorage.setItem("Quant_Funcionario", JSON.stringify(i));
                aux_i = JSON.parse(localStorage.getItem("Quant_Funcionario"));
            }   
        }else{
            alert("O seu departamento está incorreto. Somente opção 1 ou 2!");
            deptoInputElement.value = '';
        }      
    }
}



function tabela_salarial(){
    let parametro = 5;
    resgistros = JSON.parse(localStorage.getItem("Dados_Funcionario"));

    if(aux_i == undefined){
        alert("Não há nada adicionado!");
    }else{
        if(aux_i >= parametro){
            alert("Calculando...");
            console.log(resgistros);
            calculo_salario();
       }else{
            alert("Você deve adicionar no mínimo 5 funcionários!");
       }
    }
}

function calculo_salario(){
    let salario;
    let salario_base;
    let conversor_depto;
    let conversor_horas;
    for(i = 0; i < resgistros.length; i++){
        conversor_depto = Number(resgistros[i].departamento)

        if(conversor_depto == 2){
            conversor_horas = Number(resgistros[i].horas);

            salario_base = conversor_horas*22;
                
            let bonificacao_2 = bonificacao_depto_2(salario_base, conversor_horas);
            let bonificacao_g_2 = bonificacao_global(salario_base, conversor_horas);
            let isalub = insalubridade(salario_base);

            console.log(`bonificação do departamento 2:${bonificacao_2}, bonificação global:${bonificacao_g_2}, isalubridade${isalub}`);


            if(conversor_horas > 40){
                let salario_hora_extra_2 = hora_extra(22, (conversor_horas - 40));

                salario = salario_base + salario_hora_extra_2 + bonificacao_2 + isalub + bonificacao_g_2;
            }else{
                salario = salario_base + isalub + bonificacao_g_2;
            }

            local_salario[i] = salario.toFixed(2);
        }
        if(conversor_depto == 1){
            conversor_horas = Number(resgistros[i].horas);
            salario_base = conversor_horas*12;

            let bonificacao_g_1 = bonificacao_global(salario_base, conversor_horas);

            if(conversor_horas > 40){
                let salario_hora_extra_1 = hora_extra(12, (conversor_horas - 40));

                salario = salario_base + salario_hora_extra_1 + bonificacao_g_1;
            }else{
                salario = salario_base + bonificacao_g_1;
            }

            local_salario[i] = salario.toFixed(2);
        }
    }
    console.log(local_salario);
}

function hora_extra(valor, horas_adicionais){
    return valor*2*horas_adicionais;
}

function insalubridade(valor){
    return valor*0.15;
}

function bonificacao_global(salario, horas){
    if(horas > 20){
        return salario*0.03;
    }
}

function bonificacao_depto_2(salario, horas){
        if(horas >= 40){
            return salario*0.05;
        }
}

calcularElement.onclick = tabela_salarial;
adicionarElement.onclick = incluir;
logoutElement.onclick = saindo;