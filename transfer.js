// Получаем элементы карточек и бокового блока
const playerCards = document.querySelectorAll('.player-card');
const playerInfo = document.getElementById('playerInfo');
const toggleTab = document.getElementById('toggleTab');
const stickySidebar = document.querySelector('.sticky-sidebar');

// При клике на карточку игрока выводим информацию о нем в вылезающий блок
playerCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.dataset.name;
        const nation = card.dataset.nation;
        const height = card.dataset.height;
        const weight = card.dataset.weight;

        // Устанавливаем значения в боковом блоке
        document.getElementById('playerName').textContent = name;
        document.getElementById('playerNation').textContent = `Нация: ${nation}`;
        document.getElementById('playerHeight').textContent = `Рост: ${height} см`;
        document.getElementById('playerWeight').textContent = `Вес: ${weight} кг`;

        // Показываем боковой блок
        stickySidebar.classList.add('show');
    });
});

// Обработка клика по угловому элементу для скрытия бокового блока
toggleTab.addEventListener('click', () => {
    stickySidebar.classList.toggle('show');
});
