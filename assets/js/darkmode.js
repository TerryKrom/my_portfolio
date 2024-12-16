document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.dark-mode-toggle');
    
    // Verificar se há um tema salvo no localStorage e aplicar
    const savedTheme = localStorage.getItem('data-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            toggle.classList.remove('fa-sun');
            toggle.classList.add('fa-moon');
        } else {
            toggle.classList.remove('fa-moon');
            toggle.classList.add('fa-sun');
        }
    }

    toggle.addEventListener("click", () => {
        // Alternar o ícone
        if (toggle.classList.contains('fa-sun')) {
            toggle.classList.remove('fa-sun');
            toggle.classList.add('fa-moon');
        } else {
            toggle.classList.remove('fa-moon');
            toggle.classList.add('fa-sun');
        }
        
        // Alternar o tema do body
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        
        // Salvar o novo tema no localStorage
        localStorage.setItem('data-theme', newTheme);
    });
});
