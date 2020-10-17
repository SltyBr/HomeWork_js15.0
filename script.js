'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    start = function() {
        do {money = prompt('Ваш месячный доход?', 20000);}
        while (!isNumber(money));
    };
    
    start();
    
let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function() {
        let amount = 0;
        let sum = 0;
        for (let i = 0; i < 2; i++) {
    
            appData.expenses[i] = prompt('Введите обязательную статью расходов?', 'Квартира');
    
            amount = prompt('Во сколько это обойдется?');
            while (!isNumber(amount)) {
                amount = prompt('Во сколько это обойдется?');
            }
            sum += +amount;
        }
    
        return (sum);
    },
    getAccumulatedMonth: function() {
        return (money - expensesAmount);
    },
    getTargetMonth: function () {
        if (appData.mission/accumulatedMonth > 0) {
            return ('Месяцев до цели: ' + Math.ceil(appData.mission/accumulatedMonth));
        } else {
            return ('Цель не будет достигнута :(');
        }
    },
    getStatusIncome: function(){
        if (budgetDay >= 1200) {
            return ('у вас высокий уровень дохода!');
        } else if (budgetDay >= 600 && budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay < 600 && budgetDay >= 0){
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
};

appData.asking();

let expensesAmount = appData.getExpensesMonth();

let accumulatedMonth = appData.getAccumulatedMonth();

let budgetDay = Math.floor(accumulatedMonth/30);


console.log('Бюджет на день: ', budgetDay);
console.log(appData.getStatusIncome());
console.log('Сумма обязательных расходов: ' + expensesAmount);
console.log('Накопления за месяц: ' + appData.getAccumulatedMonth());
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log(appData.getTargetMonth());