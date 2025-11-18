$(function () {
  // ============================================
  // LOGIN
  // ============================================
  const formLogin = $("#formLogin")[0];
  const inputUsuario = $("#usuario");
  const inputSenha = $("#senha");
  const btnLogin = $("#handleLogin");

  const customValidatorsLogin = [
    {
      field: inputSenha,
      validate: (value) => /[A-Z]/.test(value),
      message: "A senha deve conter ao menos 1 letra maiúscula.",
    },
    // {
    //   field: inputSenha,
    //   validate: (value) => /\d/.test(value),
    //   message: "A senha deve conter ao menos 1 número.",
    // },
    {
      field: inputUsuario,
      validate: (value) => !/\s/.test(value),
      message: "O usuário não pode conter espaços.",
    },
    // {
    //   field: inputUsuario,
    //   validate: (value) => /^[A-Za-z]/.test(value),
    //   message: "O usuário deve começar com uma letra.",
    // },
    {
      field: inputUsuario,
      validate: (value) => value.length > 3,
      message: "Deve ter no mínimo 4 caracteres",
    },
    // ---------------------------------------------------------
    // adicionar qualquer nova validação aqui:
    //
    // {
    //   field: inputSenha,
    //   validate: (value) => value.length >= 8,
    //   message: "A senha deve ter no mínimo 8 caracteres."
    // }
    // ---------------------------------------------------------
  ];

  customValidatorsLogin.forEach(({ field }) => {
    field.on("input", function () {
      if ($(formLogin).hasClass("was-validated")) {
        validarCamposCustomizadosLogin();
      }
    });
  });

  function validarCamposCustomizadosLogin() {
    let tudoValido = true;
    customValidatorsLogin.forEach(({ field, validate, message }) => {
      const valor = field.val();

      if (!validate(valor)) {
        field[0].setCustomValidity(message);
        field.addClass("is-invalid").removeClass("is-valid");
        field.siblings(".invalid-feedback").text(message);

        tudoValido = false;
      } else {
        field[0].setCustomValidity("");
        field.addClass("is-valid").removeClass("is-invalid");
      }
    });

    return tudoValido;
  }

  btnLogin.on("click", function () {
    const validoCustom = validarCamposCustomizadosLogin();
    const validoNativo = formLogin.checkValidity();
    $(formLogin).addClass("was-validated");

    if (!validoNativo || !validoCustom) {
      console.warn("⚠️ Validação de login falhou");
      return;
    }

    console.log("✅ Login válido! Enviando para API...");

    // REQUISIÇÃO
    /*
    instance_api.post("/login", {
      usuario: inputUsuario.val().trim(),
      senha: inputSenha.val().trim(),
      lembrar: $("#lembrar").is(":checked")
    })
    .then(res => {
      console.log("LOGIN OK", res.data);
      // Redirecionar:
      // window.location.href = "/dashboard";
    })
    .catch(err => {
      console.error("Erro no login", err);
    });
    */
  });

  // ============================================
  // REGISTRO
  // ============================================
  const formRegister = $("#formRegister")[0];
  const inputRegisterUsuario = $("#registerUsuario");
  const inputRegisterEmail = $("#registerEmail");
  const inputRegisterPassword = $("#registerPassword");
  const inputRegisterRepeatPassword = $("#registerRepeatPassword");
  const btnRegister = $("#handleRegister");

  const customValidatorsRegister = [
    {
      field: inputRegisterRepeatPassword,
      validate: (value) => value === inputRegisterPassword.val(),
      message: "As senhas não coincidem.",
    },
    // ---------------------------------------------------------
    // adicionar qualquer nova validação de registro aqui:
    //
    // {
    //   field: inputRegisterPassword,
    //   validate: (value) => /[A-Z]/.test(value),
    //   message: "A senha deve conter ao menos 1 letra maiúscula."
    // }
    // ---------------------------------------------------------
  ];

  // Adiciona listeners para validação em tempo real
  customValidatorsRegister.forEach(({ field }) => {
    field.on("input", function () {
      if ($(formRegister).hasClass("was-validated")) {
        validarCamposCustomizadosRegister();
      }
    });
  });

  function validarCamposCustomizadosRegister() {
    let tudoValido = true;

    customValidatorsRegister.forEach(({ field, validate, message }) => {
      const valor = field.val().trim();

      if (!validate(valor)) {
        field[0].setCustomValidity(message);
        field.addClass("is-invalid").removeClass("is-valid");
        field.siblings(".invalid-feedback").text(message);

        tudoValido = false;
      } else {
        field[0].setCustomValidity("");
        field.addClass("is-valid").removeClass("is-invalid");
      }
    });

    return tudoValido;
  }

  btnRegister.on("click", function () {
    const validoCustom = validarCamposCustomizadosRegister();
    const validoNativo = formRegister.checkValidity();
    $(formRegister).addClass("was-validated");

    if (!validoNativo || !validoCustom) {
      console.warn("⚠️ Validação de registro falhou");
      return;
    }

    console.log("✅ Registro válido! Enviando para API...");

    // REQUISIÇÃO
    /*
    instance_api.post("/register", {
      usuario: inputRegisterUsuario.val().trim(),
      email: inputRegisterEmail.val().trim(),
      senha: inputRegisterPassword.val().trim(),
      aceitouTermos: $("#aceitarTermos").is(":checked")
    })
    .then(res => {
      console.log("REGISTRO OK", res.data);
      // Redirecionar ou trocar para a tab de login:
      // $("#login-tab").tab("show");
    })
    .catch(err => {
      console.error("Erro no registro", err);
    });
    */
  });
});
