const password = document.getElementById('inputpassaword');
const email = document.getElementById('inputEmail');
const formulario = document.getElementsByClassName('o-formulario2')[0];
const erro = document.getElementById('erro');


function autenticacao(){
    if(email.value == "felipe@gmail.com"){
        formulario.action = "indexLogado.html";
    
    }else if(email.value == "adm@adm.com"){
        formulario.action = "administrador.html";
    }
    else{
        formulario.action = "loginErro.html";   
    }
}

function goBack() {
    window.history.back();
}

