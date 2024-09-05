// Функція для завантаження автомобілів
async function loadCars() {
    try {
        // Виконання запиту до API
        const response = await fetch('http://brichkilviv.zzz.com.ua/api/cars.php');
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

            // Додаємо HTML-код для блоку автомобіля
            carBlock.innerHTML = `
                <img src="cars-photos/${car.image}" alt="${car.make} ${car.model}">
                <h2>${car.make} ${car.model}</h2>
                <p>Рік: ${car.year}</p>
                <p>Пробіг: ${car.mileage} км</p>
                <p>Стан: ${car.car_condition}</p>
                <p>Ціна: ${car.price} грн</p>
            `;
            carList.appendChild(carBlock);
        });
    } catch (error) {
        console.error('Помилка при завантаженні автомобілів:', error);
    }
}

// Ініціалізуємо функцію завантаження автомобілів після завантаження DOM
document.addEventListener('DOMContentLoaded', loadCars);
