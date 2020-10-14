'use strict';

function strTrim(str) {

if (str !== String(str))
{
    console.log('это не строка');
} else {
    let str1 = str.trim();
    if (str1.length > 30) {console.log(str1.substr(0, 30) + '...');} 
    else {console.log(str1 + ': строка содержит меньше 30 символов, операция невозможна');}
}}

strTrim('                aaaaaaaaaaaa                      ');