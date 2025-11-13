$(function () {
  const $form = $('#loginForm');

  const username = $('#username').val().trim();
  const password = $('#password').val().trim();

  $form.on('submit', function (event) {
    if (!$form[0].checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      
      if (username.length < 3) {
        const avisoUsuarioCurto = 'Usuário muito curto!';
        $('#mensagemErroUsuario').text(avisoUsuarioCurto);
        $('#username').attr('minlength', 4);
      }

      if (password.length == 0){
        const avisoSenhaVazia = 'Forneça uma senha!';
        $('#mensagemErroSenha').text(avisoSenhaVazia);
        $('#password').val('');
      } 

      if (password.length < 8){
        $('#password').attr('minlength', 8);
        $('#password').val('');
      }

      $form.addClass('was-validated');
      console.log($form.val())
      return;
    }
  });

  console.log('Usuário:', username);
  console.log('Senha:', password);
});
