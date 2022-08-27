let conversa = [];
let mensagem = "";

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