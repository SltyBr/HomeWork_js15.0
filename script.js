'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Freelance 120000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses = [],
    mission = 100000,
    period = 6;

let start = function() {
    do {money = prompt('Ваш месячный доход?', 20000);}
    while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function() {
 
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', 'Квартира');

        sum += +prompt('Во сколько это обойдется?');
    }

    return (sum);
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
    return (money - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = Math.floor(accumulatedMonth/30);

let getTargetMonth = function () {
    if (mission/accumulatedMonth > 0) {
        return ('Месяцев до цели: ' + Math.ceil(mission/accumulatedMonth));
    } else {
        return ('Цель не будет достигнута :(');
    }
};

let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return ('у вас высокий уровень дохода!');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0){
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};

console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());
console.log('Сумма обязательных расходов: ' + expensesAmount);
console.log('Накопления за месяц: ' + getAccumulatedMonth());
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log(getTargetMonth());

