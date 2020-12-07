// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
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