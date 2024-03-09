const toggleButtons = document.querySelectorAll('.color-toggle');

// Añade un event listener a cada botón
toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Comprueba si el botón tiene la clase btn-danger
    if (this.classList.contains('btn-danger')) {
      // Cambia de btn-danger a btn-success
      this.classList.remove('btn-danger');
      this.classList.add('btn-success');
      
    } else {
      // Cambia de btn-success a btn-danger
      this.classList.remove('btn-success');
      this.classList.add('btn-danger');
      
    
    }
  });
});