document.getElementById('addCarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('http://brichkilviv.zzz.com.ua/api/add-car.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Автомобіль успішно додано!');
            document.getElementById('addCarForm').reset();
        } else {
            alert('Сталася помилка при додаванні автомобіля: ' + (data.error || 'Невідомий помилковий стан'));
        }
    })
    .catch(error => console.error('Помилка:', error));
});
