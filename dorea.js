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

    initThemeSlider();
});


// работа слайдера
const slider = document.querySelector(".sidebar-image");
const prevBtn = slider.querySelector(".prev");
const nextBtn = slider.querySelector(".next");
const dotsContainer = slider.querySelector(".slider-dots");

let slides = slider.querySelectorAll(".slide");
let dots = dotsContainer.querySelectorAll(".slider-dot");

let countSlide = slides.length;

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

// Загрузка слайдера
function initThemeSlider() {
    const isLight = document.body.classList.contains("light-theme");
    console.log('isLight ' + isLight ? '0' : '1');

    const activeGroup = slider.querySelector(
        isLight ? '.slides-group[data-theme="light"]' : '.slides-group[data-theme="dark"]'
    );
    console.log('activeGroup ' + activeGroup);

    // Берем слайды только из активной темы
    slides = activeGroup.querySelectorAll(".slide");
    countSlide = slides.length;

    // Сбрасываем активность на первый слайд в этой группе
    slides.forEach((slide, i) => slide.classList.toggle("active", i === 0));
    currentIndex = 0;

    // Пересоздаём точки под количество слайдов в выбранной теме
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    dots = dotsContainer.querySelectorAll(".slider-dot");
    resetTimer();
}

// Инициализация слайдера при открытии страницы
initThemeSlider();

// Запускаем автопрокрутку
startTimer();
