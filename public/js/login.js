$(function () {
  $('').on('submit', function (e) {
    e.preventDefault(); // evita recarregar a página.

    const username = $('#username').val().trim();
    const password = $('#password').val().trim();

    let valid = true;

    if (!username) {
      $('#username').addClass('is-invalid');
      valid = false;
    } else {
      $('#username').removeClass('is-invalid');
    }

    if (!password) {
      $('#password').addClass('is-invalid');
      valid = false;
    } else {
      $('#password').removeClass('is-invalid');
    }

    if (valid) {
      alert('Campos preenchidos corretamente!');
    }
  });

});

$(function () {
  const form = document.getElementById('loginForm')

  form.addEventListener('submit', (event) => {
    // Impede envio real se houver campos inválidos
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    // Ativa as classes visuais de validação do Bootstrap
    form.classList.add('was-validated')
  })
});



