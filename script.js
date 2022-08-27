let conversa = [];
let mensagem = "";

const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
promessa.then(sucesso);
promessa.catch(trataErrro);

function sucesso(resposta){
    console.log(`Recebeu resposta do servidor! code ${resposta.status}`)
}

function trataErrro(erro){
    const codErro = erro.response.status;
    window.location.assign(`https://http.dog/${codErro}.jpg`);
}


function abreMenu(){
    const element = document.querySelector(".submenu");
    element.classList.remove("escondido");
}

function fechaMenu(){
    const element = document.querySelector(".submenu");
    element.classList.add("escondido");
}

function enviarComEnter(tecla){
    if(event.key === 'Enter'){
        enviaMensagem(tecla.nextElementSibling);
    }
}

function enviaMensagem(button){
    mensagem = button.previousElementSibling.value;
    conversa.push(mensagem);
    renderizaConversa();
    console.log(conversa);
}

function renderizaConversa(){
    const elemento = document.querySelector(".msg-box");
    elemento.innerHTML = '';
    for(let i= 0; i < conversa.length ; i++){
        elemento.innerHTML += `<li> ${conversa[i]}</li>`;
    }
}