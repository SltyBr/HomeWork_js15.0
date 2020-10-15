'use strict';
// Первая часть усложненного ДЗ
// 1)Решение с помощью if else
/* let lang = prompt('выберите язык ru/en?');

    if (lang == 'ru') {
        alert('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break;
    } else if (lang == 'en') {
        alert('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        break;
    } else {
        console.log('Что-то пошло не так');
    }

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

let lang = {
    ru: 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье',
    en: 'monday, tuesday, wednesday, thursday, friday, saturday, sunday'
};

let key = prompt("Выберите язык ru/en?");

alert( lang[key] );


//---------------------------------------------------------------------//

// Вторая часть усложненного ДЗ

/* let namePerson = prompt('Введите имя ');

let position = (namePerson == 'Артем') ? console.log('Директор'):
                (namePerson == 'Максим') ? console.log('Преподаватель'):
                console.log('Студент'); */
