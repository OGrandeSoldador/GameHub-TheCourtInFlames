$(function () {
  const $form = $('#loginForm');

  const username = $('#username').val()
  const password = $('#password').val()
  console.log('Usuário:', username);
  console.log('Senha:', password);

  $form.on('keypress', function (e) {
    $form.removeClass('was-validated');
  });

  $form.on('submit', function (event) {
    if (!$form[0].checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      if (username.length < 3) {
        const avisoUsuarioCurto = 'Usuário muito curto, mínimo de 4 caracteres!';
        $('#mensagemErroUsuario').text(avisoUsuarioCurto);
      }

      if (password.length < 8) {
        const avisoSenhaCurta = 'Senha inválida!';
        $('#mensagemErroSenha').text(avisoSenhaCurta);
        $('#password').val('');
      }

      $form.addClass('was-validated');
      console.log($form.val())
      return;
    }
  });

});
