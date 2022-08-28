let conversa = [];
let contatos = [];

let nome = {
    name: ''
}

let mensagem = {
	from: "",
	to: "Todos",
	text: "",
	type: "message" // ou "private_message" para o bônus
};

nome.name = prompt("Qual seu nome?");


const entraNaSala = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

entraNaSala.catch(trataErrro);

let promessaMsg;

let participantes;

function enviarPara(element){
    const desmarcar = document.querySelector('.destinatario');
    desmarcar.classList.toggle('destinatario');

    element.classList.toggle('destinatario');
    mensagem.to = `${element.querySelector('p').innerHTML}`
    console.log(mensagem.to);

}

setInterval(requisitaMsg, 2000, promessaMsg);
setInterval(requisitaPcp, 2000, participantes);
setInterval(statusParticipante, 4000, nome);

function requisitaMsg(a){
    a = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    a.then(sucesso);
    a.catch(trataErrro);
}

function requisitaPcp(a){
    a = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    a.then(sucessoContatos);
    a.catch(trataErrro);
}

function sucesso(resposta){
    /* console.log(`Recebeu resposta do servidor! code ${resposta.status}`) */
    conversa = resposta.data;
    renderizaConversa();
}

function sucessoContatos (resposta){
    contatos = resposta.data;
    menuParticipantes();
}

function trataErrro(erro){
    const codErro = erro.response.status;
    window.location.assign(`https://http.dog/${codErro}.jpg`);
}
function statusParticipante(participante){
    const estaOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
    estaOnline.catch(trataErrro);
}

function menuParticipantes(){
    const elemento = document.querySelector(".opcoes");
    elemento.innerHTML = `<div class="titulo">
    <h1>Escolha um contato<br> 
        para enviar mensagem:</h1>
    </div>

    <div class="contato todos destinatario" onclick='enviarPara(this)'> 
        <ion-icon name="people"></ion-icon>
        <div>
            <p>Todos</p>
            <ion-icon name="checkmark-sharp"></ion-icon>
        </div>
    </div>`;

    for(let i= 0; i < contatos.length ; i++){
    elemento.innerHTML += `<div class="contato" onclick='enviarPara(this)'> 
        <ion-icon name="people"></ion-icon>
        <div>
            <p>${contatos[i].name}</p>
            <ion-icon name="checkmark-sharp"></ion-icon>
        </div>
    </div>`;
    }
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
    mensagem.from = nome.name;
    mensagem.text = button.previousElementSibling.value;
    if(!mensagem.text){
        return;
    }
    button.previousElementSibling.value = '';
    const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    renderizaConversa();
}

function renderizaConversa(){
    const elemento = document.querySelector(".msg-list");
    elemento.innerHTML = '';
    for(let i= 0; i < conversa.length ; i++){
        if (conversa[i].type === 'status'){
        elemento.innerHTML += `<li class ='status'> (${conversa[i].time}) <strong>${conversa[i].from}</strong>
         para <strong>${conversa[i].to}</strong>: 
         ${conversa[i].text}</li>`;
        }else{
        elemento.innerHTML += `<li>(${conversa[i].time}) <strong>${conversa[i].from}</strong>
         para <strong>${conversa[i].to}</strong>: 
         ${conversa[i].text}</li>`;
        }
    }
    elemento.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"
});

}