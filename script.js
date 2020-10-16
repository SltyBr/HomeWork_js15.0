'use strict';

let secret = 47;
 
function guess() {
    let num = prompt('Угадай число от 1 до 100');
    if (num == secret) {
        alert('Угадали!');
    } else if (num === null) {
        alert('Игра окончена');
    }
    else if (num > secret) {
        alert('Загаданное число меньше');
        guess();}
     else if (num < secret) {
        alert('Загаданное число больше');
        guess();
    } else if (isNaN(num)) {
        alert('Это не число');
        guess();
    }
}   

guess();
