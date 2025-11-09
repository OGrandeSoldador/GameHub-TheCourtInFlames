$('#botaoCadastro').click(function () {
    localStorage.setItem('abrirAba', 'cadastro');
});

$(function () {
    const aba = localStorage.getItem('abrirAba');

    if (aba === 'cadastro') {
        const tab = new bootstrap.Tab('#register-tab');
        tab.show();
        localStorage.removeItem('abrirAba');
    }
});
