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