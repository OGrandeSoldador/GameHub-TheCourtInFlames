$(function () {
  // ============================================
  // LOGIN
  // ============================================
  const formLogin = $("#formLogin")[0];
  const inputUsuario = $("#usuario");
  const inputSenha = $("#senha");
  const btnLogin = $("#handleLogin");

  const customValidatorsLogin = [
    // Validações do USUÁRIO
    {
      field: inputUsuario,
      validate: (value) => value.trim().length > 0,
      message: "O usuário é obrigatório.",
    },
    {
      field: inputUsuario,
      validate: (value) => !/\s/.test(value),
      message: "O usuário não pode conter espaços.",
    },

    // Validações da SENHA
    {
      field: inputSenha,
      validate: (value) => value.length > 0,
      message: "A senha é obrigatória.",
    },
    {
      field: inputSenha,
      validate: (value) => value.length >= 8,
      message: "A senha deve ter no mínimo 8 caracteres.",
    },
    // ---------------------------------------------------------
    // Adicionar mais validações de senha aqui
    //
    // {
    //   field: inputSenha,
    //   validate: (value) => /[A-Z]/.test(value),
    //   message: "A senha deve conter ao menos 1 letra maiúscula.",
    // },
    {
      field: inputSenha,
      validate: (value) => /\d/.test(value),
      message: "A senha deve conter ao menos 1 número.",
    },
    // ---------------------------------------------------------
  ];

  // Listeners para validação em tempo real
  customValidatorsLogin.forEach(({ field }) => {
    field.on("input", function () {
      if ($(formLogin).hasClass("was-validated")) {
        validarCamposCustomizadosLogin();
      }
    });
  });

  function validarCamposCustomizadosLogin() {
    let todosValidos = true;
    const camposProcessados = new Set();

    customValidatorsLogin.forEach(({ field, validate, message }) => {
      const valor = field.val();
      const fieldId = field.attr("id");

      if (camposProcessados.has(fieldId)) {
        return;
      }

      const validacoesDoCampo = customValidatorsLogin.filter(
        (v) => v.field.attr("id") === fieldId
      );

      let primeiroErro = null;
      let todasPassaram = true;

      for (const validacao of validacoesDoCampo) {
        if (!validacao.validate(valor)) {
          if (!primeiroErro) {
            primeiroErro = validacao.message;
          }
          todasPassaram = false;
        }
      }

      if (!todasPassaram) {
        field.addClass("is-invalid").removeClass("is-valid");
        field.siblings(".invalid-feedback").text(primeiroErro);
        todosValidos = false;
      } else {
        field.addClass("is-valid").removeClass("is-invalid");
        field.siblings(".invalid-feedback").text("");
      }

      camposProcessados.add(fieldId);
    });

    return todosValidos;
  }

  btnLogin.on("click", function () {
    $(formLogin).addClass("was-validated");
    const valido = validarCamposCustomizadosLogin();

    if (!valido) {
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
      window.location.href = "/dashboard";
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
  const inputAceitarTermos = $("#aceitarTermos");
  const btnRegister = $("#handleRegister");

  const customValidatorsRegister = [
    // Validações do USUÁRIO
    {
      field: inputRegisterUsuario,
      validate: (value) => value.trim().length > 0,
      message: "O usuário é obrigatório.",
    },
  ];

  customValidatorsRegister.forEach(({ field }) => {
    field.on("input change", function () {
      if ($(formRegister).hasClass("was-validated")) {
        validarCamposCustomizadosRegister();
      }
    });
  });

  inputRegisterPassword.on("input", function () {
    if (
      $(formRegister).hasClass("was-validated") &&
      inputRegisterRepeatPassword.val().length > 0
    ) {
      validarCamposCustomizadosRegister();
    }
  });

  function validarCamposCustomizadosRegister() {
    let todosValidos = true;
    const camposProcessados = new Set();

    customValidatorsRegister.forEach(({ field, validate, message }) => {
      const valor = field.val();
      const fieldId = field.attr("id");

      if (camposProcessados.has(fieldId)) {
        return;
      }

      const validacoesDoCampo = customValidatorsRegister.filter(
        (v) => v.field.attr("id") === fieldId
      );

      let primeiroErro = null;
      let todasPassaram = true;

      for (const validacao of validacoesDoCampo) {
        if (!validacao.validate(valor)) {
          if (!primeiroErro) {
            primeiroErro = validacao.message;
          }
          todasPassaram = false;
        }
      }

      if (!todasPassaram) {
        field.addClass("is-invalid").removeClass("is-valid");
        field.siblings(".invalid-feedback").text(primeiroErro);

        if (field.is(":checkbox")) {
          field.siblings(".invalid-feedback").show();
        }

        todosValidos = false;
      } else {
        field.addClass("is-valid").removeClass("is-invalid");
        field.siblings(".invalid-feedback").text("").hide();
      }

      camposProcessados.add(fieldId);
    });

    return todosValidos;
  }

  btnRegister.on("click", function () {
    $(formRegister).addClass("was-validated");
    const valido = validarCamposCustomizadosRegister();

    if (!valido) {
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
      aceitouTermos: inputAceitarTermos.is(":checked")
    })
    .then(res => {
      console.log("REGISTRO OK", res.data);
      $("#login-tab").tab("show");
    })
    .catch(err => {
      console.error("Erro no registro", err);
    });
    */
  });
});
