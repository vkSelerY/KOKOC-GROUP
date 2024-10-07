document.addEventListener('DOMContentLoaded', () => {
    const sidebarInfo = document.querySelector('.sidebar-info');
    const playerCards = document.querySelectorAll('.player-card');
    const toggleInfoBtn = document.querySelector('.toggle-info');

    playerCards.forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('player-birth').textContent = card.getAttribute('data-birth');
            document.getElementById('player-nationality').textContent = card.getAttribute('data-nationality');
            document.getElementById('player-height').textContent = card.getAttribute('data-height');
            document.getElementById('player-weight').textContent = card.getAttribute('data-weight');
            sidebarInfo.classList.add('active');
        });
    });

    toggleInfoBtn.addEventListener('click', () => {
        sidebarInfo.classList.toggle('active');
    });
});
