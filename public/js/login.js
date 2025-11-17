$(function () {
  const form = $('#loginForm');

  form.on('keypress', function (e) {
    form.removeClass('was-validated');
  });

  form.on('submit', function (event) {

    const userName = $('#username').val();
    const passWord = $('#password').val();

    if (!form[0].checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      if (userName.length < 4 || userName.length > 32) {
        const avisoUsuarioCurto = 'Usuário muito curto, mínimo de 4 caracteres!';
        $('#mensagemErroUsuario').text(avisoUsuarioCurto);
        $('.bi-person').hide()
      }

      if (passWord.length < 8 || passWord.length > 32) {
        const avisoSenhaCurta = 'Senha inválida!';
        $('#mensagemErroSenha').text(avisoSenhaCurta);
        $('#password').val('');
      }

        form.addClass('was-validated');
    }
  });
});

