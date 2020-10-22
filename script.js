'use strict';

const books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    body = document.body,
    adv = document.querySelector('.adv'),
    liListTwo = book[0].querySelectorAll('li'), // достаем коллекцию списка глав второй книги
    liListFive = book[5].querySelectorAll('li'), // достаем коллекцию списка глав пятой книги
    ulListSix = book[2].querySelector('ul'), // достаём список шестой книги из DOM дерева
    liListSix = ulListSix.querySelectorAll('li'); // получаем коллекцию списка глав шестой книги

// восстановить порядок книг
books.prepend(book[1]);
book[3].before(book[4]);
books.append(book[2]);
//======================

// заменить картинку заднего фона на другую
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
//======================

// исправить заголовок в книге 3
book[4].querySelector('h2').querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';
// =====================

// удалить рекламу
adv.remove();
//======================

// восстановить порядок глав во второй книге
liListTwo[3].after(liListTwo[6]);
liListTwo[6].after(liListTwo[8]);
liListTwo[10].before(liListTwo[2]);
//======================

// восстановить порядок глав в пятой книге
liListFive[10].before(liListFive[8]);
liListFive[8].before(liListFive[5]);
liListFive[3].before(liListFive[9]);
liListFive[4].after(liListFive[2]);
//======================


// в шестой книге добавить главу
ulListSix.insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>');
ulListSix.append(liListSix[9]);
//======================

console.log(book);
console.log(liListFive);
