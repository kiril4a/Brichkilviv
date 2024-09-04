document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('deleteCarForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {
            id: formData.get('id')
        };

        fetch('http://brichkilviv.zzz.com.ua/api/delete-car.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Автомобіль успішно видалено!');
                // Можливо, ви хочете оновити список автомобілів
                location.reload(); // Перезавантажити сторінку
            } else {
                alert('Сталася помилка при видаленні автомобіля: ' + (data.error || 'Невідомий помилковий стан'));
            }
        })
        .catch(error => console.error('Помилка:', error));
    });
});
