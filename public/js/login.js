$(function () {
  const form = document.getElementById('loginForm')

  form.addEventListener('submit', (event) => {
    // Impede envio real se houver campos inválidos
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
      form.classList.add('was-validated')
    }
    
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

  })
});

