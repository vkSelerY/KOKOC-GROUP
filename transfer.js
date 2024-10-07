const logotype = document.getElementById('logotype');
if (logotype) {
    logotype.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}

const teamLink = document.getElementById('team-link');
if (teamLink) {
    teamLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'team.html';
    });
}