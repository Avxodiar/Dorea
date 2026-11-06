const toggleBtn = document.getElementById('themeToggle');

// 1. Проверяем сохраненную тему при загрузке страницы
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.textContent = '🌙 Темная тема';
}

// 2. Обработчик клика с сохранением выбора в LocalStorage
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    let theme = 'dark';
    if (document.body.classList.contains('light-theme')) {
        theme = 'light';
        toggleBtn.textContent = '🌙 Темная тема';
    } else {
        toggleBtn.textContent = '☀️ Светлая тема';
    }

    localStorage.setItem('theme', theme);
});
