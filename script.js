'use strict';

let money = prompt('Ваш месячный доход?', 20000), 
    income = 'Freelance 120000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?', 3000),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?', 3000),
    mission = 100000,
    period = 6;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function() {
    return (amount1 + amount2);
};

let getAccumulatedMonth = function() {
    return (money - getExpensesMonth());
};

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = Math.floor(accumulatedMonth/30);

let getTargetMonth = function () {
    return mission/accumulatedMonth;
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
console.log('Сумма обязательных расходов: ' + getExpensesMonth());
console.log('Накопления за месяц: ' + getAccumulatedMonth());
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log('Месяцев накопления: ' + Math.floor(getTargetMonth()));

