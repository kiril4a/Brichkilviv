// Ініціалізація EmailJS
(function() {
    emailjs.init("Be_Bc8EG1H733QJYX"); // Ваш EmailJS user ID
})();

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

    // Налаштування форми
    const form = document.getElementById('quickContactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Валидація форми
            const name = document.getElementById('quick-name').value;
            const phone = document.getElementById('quick-phone').value;

            if (!name || !phone) {
                alert('Будь ласка, заповніть всі поля.');
                return;
            }

            // Відправка форми через EmailJS
            emailjs.send("service_ek16b4t","template_db5gmnx",form);
                .then(function(response) {
                    alert('Ваше повідомлення було відправлено!');
                }, function(error) {
                    alert('Сталася помилка при відправленні повідомлення.');
                    console.error('Error:', error);
                });
            
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

    // Сховати/показати хедер при скролінгу
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

    // Кнопка "Повернутися на верх"
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
