let conversa = [];
let mensagem = "";
let nome = {
    name: ''
}

nome.name = prompt("Qual seu nome?");

const entraNaSala = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

entraNaSala.catch(trataErrro);

let promessaMsg;

setInterval(requisitaMsg, 1000, promessaMsg);

promessaMsg.then(sucesso);

promessaParticipantes.catch(trataErrro)
//promessaConexao.catch(trataErrro)
promessaMsg.catch(trataErrro);

function requisitaMsg(a){
    a = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    a.then(sucesso);
}

function sucesso(resposta){
    /* console.log(`Recebeu resposta do servidor! code ${resposta.status}`) */

    conversa = resposta.data;
    renderizaConversa();
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
}

function renderizaConversa(){
    const elemento = document.querySelector(".msg-list");
    elemento.innerHTML = '';
    for(let i= 0; i < conversa.length ; i++){
        elemento.innerHTML += `<li> (${conversa[i].time}) <strong>${conversa[i].from}</strong>
         para <strong>${conversa[i].to}</strong>: 
         ${conversa[i].text}</li>`;
        }
    
    elemento.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"
});

}