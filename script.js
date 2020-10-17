'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let secret = Math.ceil(Math.random()*101);
let n = 10;
 
function guess() {
    let num = prompt('Угадай число от 1 до 100' + ', у вас есть ' + n + ' попыток');
    n--;
    if (n == 0) 
    {
        if (confirm('Игра окончена, хотите попробовать ещё?')) 
            {
            n = 10;
            guess();
            }
    } else {
        if (num == secret) {
            alert('Угадали!');
        }   
        else if (!isNumber(num)) {
            alert('Введи число!');
            guess();
        }   
        else if (num === null) {
            alert('Игра окончена');
        }
        else if (num > secret) {
            alert('Загаданное число меньше');
            guess();
        }
        else if (num < secret) {
            alert('Загаданное число больше');
            guess();
        }
    }
}   

guess();

