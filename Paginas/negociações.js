const button = document.getElementById('btn-primary'); // or classname, whatever. it is your link or any node element instead of it. 
const div = document.getElementById('linha2');
const modelo = document.getElementsByClassName('modal-backdrop');
const concretize = document.getElementsByClassName('btn-concretizar')[0];
const divConcrete = document.getElementById('btn-concretiza-area');
const ratingstar = document.getElementsByClassName('rate')[0];
const enviar = document.getElementById('enviar');
const divAv = document.getElementById('linha');

function addRow() {
    const div = document.createElement('div');
  
    div.className = '';
  
    div.innerHTML = `
    
    `;
  
    document.getElementById('neg-pendentes').appendChild(div);
}

function toggleDiv(e) {
    // e - event object - {button}.
    e.preventDefault(); // only if you use <a> as node.
    
    div.style.display = 'none';
    modelo[0].style.display = 'none';
    addRow();
}

function hidediv(){
    divConcrete.style.display = 'none';
    ratingstar.style.display = 'block';
}

function hidelinha(){
    divAv.style.display = 'none';
}

button.addEventListener('click', toggleDiv, false);

concretize.addEventListener('click', hidediv, false);

enviar.addEventListener('click', hidelinha , false)
