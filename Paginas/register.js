(() => {
    'use strict';
    const form = document.querySelectorAll('.needs-validation')[0];
  
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
  })();


  function goBack() {
    var popup = confirm('Caso volte, perderá todos os dados preenchidos!\nTem certeza que deseja sair?');
    if(popup == true){
      window.history.back();
    }
}