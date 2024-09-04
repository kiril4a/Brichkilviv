// Ініціалізація EmailJS
(function() {
    emailjs.init("Be_Bc8EG1H733QJYX"); // Ваш EmailJS user ID
})();

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.header__nav_mobile');

    menuToggle.addEventListener('click', function() {
        // Перемикаємо клас show для мобільного меню
        navMobile.classList.toggle('show');
        // Перемикаємо клас active для кнопки меню
        menuToggle.classList.toggle('active');
        menuToggle.classList.toggle('fixed');
    });
    
    
    // Перевіряємо, чи є фрагмент у URL
    const fragment = window.location.hash;
    
    if (fragment) {
        // Якщо фрагмент присутній, плавно прокручуємо до відповідної секції
        const targetElement = document.querySelector(fragment);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Налаштування форми для швидкого контакту
    const quickContactForm = document.getElementById('quickContactForm');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            console.log('Форма швидкого контакту була відправлена!');

            // Валидація форми
            const name = document.getElementById('quick-name').value;
            const phone = document.getElementById('quick-phone').value;

            // Параметри для шаблону
            const templateParams = {
                name: name,
                phone: phone
            };

            // Відправка форми через EmailJS
            emailjs.send("service_ek16b4t", "template_db5gmnx", templateParams)
                .then(function(response) {
                    alert('Ваше повідомлення з швидкого контакту було відправлено!');
                }, function(error) {
                    console.error('Сталася помилка при відправленні повідомлення:', error);
                    alert('Сталася помилка при відправленні повідомлення.');
                });
            
            quickContactForm.reset();
        });
    }

    // Налаштування основної форми
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);

            const contactTemplateParams = {
                'car-brand': formData.get('car-brand'),
                'car-condition': formData.get('car-condition'),
                'car-model': formData.get('car-model'),
                'car-year': formData.get('car-year'),
                'name': formData.get('name'),
                'phone': formData.get('phone'),
            };

            emailjs.send("service_ek16b4t", "template_5mrva3h", contactTemplateParams)
                .then(function(response) {
                    alert('Ваше повідомлення з основної форми було відправлено!');
                }, function(error) {
                    console.error('Сталася помилка при відправленні повідомлення:', error);
                    alert('Сталася помилка при відправленні повідомлення.');
                });

            contactForm.reset();
        });
    }

    // Плавний скролл до форми
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Перевірка на мобільні пристрої
    const isMobile = window.matchMedia("(max-width: 1250px)").matches;

    if (!isMobile) {
    // Сховати/показати хедер при скролінгу
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
        // Прокрутка вниз
        header.classList.add('hidden');
        } else {
        // Прокрутка вверх
        header.classList.remove('hidden');
        }

        lastScrollTop = Math.max(scrollTop, 0); // Запобігання негативному скролу
    }, { passive: true });

    // Кнопка "Повернутися на верх"
    const scrollToTopButton = document.querySelector('#scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
        }, { passive: true });

        scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        });
    }
    }
    loadCars();
});

// Функція для завантаження автомобілів
async function loadCars() {
    try {
        // Виконання запиту до API
        const response = await fetch('http://brichkilviv.zzz.com.ua/api/cars.php'); // Змініть URL на ваш реальний
        if (!response.ok) {
            throw new Error('Не вдалося завантажити автомобілі');
        }

        // Отримання даних у форматі JSON
        const cars = await response.json();

        // Перевірка, чи є дані
        if (cars.length === 0) {
            console.log('Немає автомобілів у базі даних');
            return;
        }

        // Знаходимо контейнер для списку автомобілів
        const carList = document.getElementById('car-list');

        // Очищуємо контейнер перед додаванням нових елементів
        carList.innerHTML = '';

        // Додаємо кожен автомобіль до контейнера
        cars.forEach(car => {
            const carBlock = document.createElement('div');
            carBlock.className = 'car-block';
            
            // Створюємо зображення автомобіля
            const carImage = new Image();
            carImage.src = car.image;
            carImage.onerror = () => {
                carImage.src = 'images/logo.jpg'; // Використовуємо logo.png якщо зображення не завантажується
            };

            // Додаємо HTML-код для блоку автомобіля
            carBlock.innerHTML = `
                <div class="container">
                <img src="cars-photos/${car.image}" alt="${car.make} ${car.model}">
                <h2>${car.make} ${car.model}</h2>
                <p>Рік: ${car.year}</p>
                <p>Пробіг: ${car.mileage} км</p>
                <p>Стан: ${car.condition}</p>
                <p>Ціна: ${car.price} грн</p>
                </div>
            `;
            carList.appendChild(carBlock);
        });
    } catch (error) {
        console.error('Помилка при завантаженні автомобілів:', error);
    }
}
