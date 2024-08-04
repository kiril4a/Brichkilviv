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
