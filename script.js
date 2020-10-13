'use strict';
// Первая часть усложненного ДЗ
// 1)Решение с помощью if else
/* let lang = prompt('выберите язык ru/en?');

for (let i = 0; i < 2; i++) {
    if (lang == 'ru') {
        alert('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break;
    } else if (lang == 'en') {
        alert('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        break;
    } else {
        lang = prompt('попробуйте ещё раз ru/en?');
        i--;
    }
} */
//---------------------------------------------------------------------//
// 2)Решение с помощью switch

/* let lang = prompt('выберите язык ru/en?'),
    i = 1;

while (i == 1) {
switch (lang) {
    case 'ru': 
        alert('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        i--;
        break;
    case 'en': 
        alert('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        i--;
        break;
    default:
        lang = prompt('попробуйте ещё раз ru/en?');
}
} */
//---------------------------------------------------------------------//

// 3)Решение с помощью многомерного массива
/* let lang = ['ru', 'en'];

let langOption = prompt('Выберите язык ru/en?');

let week = (langOption == lang[0]) ? console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'): 
    (langOption == lang[1]) ? console.log('monday, tuesday, wednesday, thursday, friday, saturday, sunday'):
    console.log('такого языка не предусмотренно, попробуй ещё'); */
//---------------------------------------------------------------------//

// Вторая часть усложненного ДЗ

/* let namePerson = prompt('Введите имя ');

let position = (namePerson == 'Артем') ? console.log('Директор'):
                (namePerson == 'Максим') ? console.log('Преподаватель'):
                console.log('Студент'); */