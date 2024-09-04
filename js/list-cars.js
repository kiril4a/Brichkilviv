document.addEventListener('DOMContentLoaded', function() {
    fetch('http://brichkilviv.zzz.com.ua/api/get-cars.php')
        .then(response => response.json())
        .then(cars => {
            const tableBody = document.getElementById('carTableBody');
            tableBody.innerHTML = ''; // Очистити таблицю перед додаванням нових даних
            
            cars.forEach(car => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${car.id}</td>
                    <td><img src="cars-photos/${car.image}" alt="${car.make} ${car.model}" style="width: 80px; height: auto;"></td>
                    <td>${car.make}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                    <td>${car.mileage} км</td>
                    <td>${car.car_condition}</td>
                    <td>${car.price} грн</td>
                `;
                
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Помилка:', error));
});
