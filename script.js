'use strict';

let money = prompt('Ваш месячный доход?'), 
    income = 'Freelance 120000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = amount1 + amount2,
    mission = 100000, 
    period = 6,
    budgetDay = Math.floor(budgetMonth/30);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев, Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ' + Math.floor(mission/(money - budgetMonth)) + ' месяцев');
console.log('Бюджет на день: ', budgetDay);


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        console.log('у вас высокий уровень дохода!');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0){
        console.log('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        console.log('Что-то пошло не так');
    }
};

getStatusIncome();
