const btnLogin = $('#btnLogin');
const form = $('#loginForm')[0];

// function retornaDados() {
//   form.on('keypress', function (e) {
//     form.removeClass('was-validated');
//     $('#mensagemErroUsuario').text('');
//     $('.input-icon').hide()
//   });

//   $("#username").focus(function () {
//     form.removeClass('was-validated');
//   });

//   form.on('submit', function (event) {

//     const userName = $('#username').val();
//     const passWord = $('#password').val();

//     let dadosOK = true

//     if (userName === '') {
//       $('#mensagemErroUsuario').text('Usuário não pode ser vazio');
//       dadosOK = false
//     }

//     if (userName.length < 4 && userName.length > 0) {
//       $('#mensagemErroUsuario').text('Usuário muito curto, mínimo de 4 caracteres');
//       dadosOK = false
//     }

//     if (userName.length > 32) {
//       $('#mensagemErroUsuario').text('Usuário muito grande, máximo de 32 caracteres');
//       $('#username').val('');
//       dadosOK = false
//     }

//     if (passWord.length < 8 || passWord.length > 32) {
//       $('#mensagemErroSenha').text('Senha inválida!');
//       $('#password').val('');
//       dadosOK = false
//     }

//     if (!dadosOK) {
//       $('.input-icon').hide()
//       form.addClass('was-validated');
//       event.preventDefault();
//       event.stopPropagation();
//     }
//     else {
//       alert('ok')
//       userController.getTrouxa
//     }

//   }

//   );
// }


$(function () {
  $('#btnLogin').on('click', function () {
    $("#loginForm").validate({
      // Rules and messages go here
      rules: {
        login: {
          required: true,
          minlength: 4,
          maxlenght: 32
        },
        senhaLogin: {
          required: true,
          minlength: 8,
          maxlenght: 32
        }
      },
      messages: {
        login: {
          required: "Please enter your name.",
          minlength: "Your name must be at least 4 characters long.",
          maxlenght: ""
        },
        senhaLogin: {
          required: "Please enter a password.",
          minlength: "Your password must be at least 8 characters long.",
          maxlenght: ""
        }
      },
      submitHandler: function (form) {
        form.submit();
      }
    });
  });
});

