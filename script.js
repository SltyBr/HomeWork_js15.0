let body = document.querySelector('.week'),
    week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    now = new Date();

function weekWindow()
{
    for (let i=0; i< week.length; i++) {
        body.innerHTML += `<div>${week[i]}</div>`;
    }
    return body.innerHTML;
}

for (let i=0; i< week.length; i++) {
    if (i == now.getDay()) {
        week[i] = '<b>' + week[i] + '</b>';
    }
    if (i == 0) {
        week[i] = '<i>' + week[i] + '</i>';
    }
    if (i == 6) {
        week[i] = '<i>' + week[i] + '</i>';
    }
}

console.log(week);

weekWindow();