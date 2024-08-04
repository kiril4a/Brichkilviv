document.addEventListener('DOMContentLoaded', function() {
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

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Простейшая валидация формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            // Дополнительно можно сделать AJAX запрос для отправки данных на сервер

            alert('Спасибо за ваше сообщение!');
            form.reset();
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

    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Прокрутка вниз
            header.classList.add('hidden');
        } else {
            // Прокрутка вверх
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    const scrollToTopButton = document.querySelector('#scroll-to-top');

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollToTopButton.classList.add('visible');
                scrollToTopButton.classList.remove('hidden');
            } else {
                scrollToTopButton.classList.add('hidden');
                scrollToTopButton.classList.remove('visible');
            }
        });
    }
});
