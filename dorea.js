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


// работа слайдера
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".sidebar-image");
    const slides = slider.querySelectorAll(".slide");
    const countSlide = slides.length;

    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (countSlide === 0) return;

    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 секунд (в миллисекундах)

    // Автоматически создаем точки по количеству слайдов
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Слайд ${index + 1}`);
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0 ) {
            newIndex = countSlide -1;
        }
        goToSlide2(newIndex);
    }

    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= countSlide ) {
            newIndex = 0;
        }
        goToSlide2(newIndex);
    }


    function goToSlide2(newIndex) {
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        slides[newIndex].classList.add("active");
        dots[newIndex].classList.add("active");
        currentIndex = newIndex;
    }

    // Запуск таймера (с защитой от дублирования и проверкой, не наведена ли мышь)
    function startTimer() {
        clearInterval(slideInterval);
        if (!slider.matches(":hover")) {
            slideInterval = setInterval(() => {
                nextSlide();
            }, intervalTime);
        }
    }

    function stopTimer() {
        clearInterval(slideInterval);
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    // Пауза при наведении мыши на слайдер и его кнопки
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);

    // Запускаем автопрокрутку
     startTimer();
});
