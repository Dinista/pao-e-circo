const button = document.getElementById('botao-dados');
const div = document.getElementById('form-dados');
var x = new Boolean(true); //flag

const buttonEndereco = document.getElementById('btn-endereco');
const divendereco = document.getElementById('form-endereco');
var y = new Boolean(true); //flag



function toggleDiv() {
    if(x){
        div.style.display = 'block';
    }else{
        div.style.display = 'none';
    }
    x = !x;
}

function toggleDiv2() {
    if(y){
        divendereco.style.display = 'block';
    }else{
        divendereco.style.display = 'none';
    }
    y = !y;
}

button.addEventListener('click', toggleDiv, false);

buttonEndereco.addEventListener('click', toggleDiv2, false);

(() => {
    'use strict';
const form = document.querySelectorAll('.needs-validation')[0];
const form2 = document.querySelectorAll('.needs-validation')[1];
  
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });

      form2.addEventListener('submit', function(event) {
        if (form2.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form2.classList.add('was-validated');
      });

  })();

  const showalt = document.getElementById('salve-pic');

  function preview_image(event){
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('avatar-preview');
      output.src = reader.result;
      showalt.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  function preview_image2(event){
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('bg-preview');
      output.src = reader.result;
      showalt.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
  }



