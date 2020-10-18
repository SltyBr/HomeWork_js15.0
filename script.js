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

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
            amount = 0,
            expenses;
            
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
                expenses = prompt('Введите обязательную статью расходов?', 'Квартира');
                amount = prompt('Во сколько это обойдется?');
                
                while (!isNumber(amount)) {
                    amount = prompt('Во сколько это обойдется?');
                }

                appData.expenses[expenses] = amount;
        }
    },
    getExpensesMonth: function() {

        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
        return (appData.expensesMonth);
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    getTargetMonth: function () {
        if (appData.mission/appData.budgetMonth > 0) {
            return ('Месяцев до цели: ' + Math.ceil(appData.mission/appData.budgetMonth));
        } else {
            return ('Цель не будет достигнута :(');
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return ('у вас высокий уровень дохода!');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
};

function appDataOptions() {
    console.log('Наша программа включает в себя данные: ');
    for (let key in appData)
    {console.log('Свойство: ' + key + ' Значение: ' + appData[key]);}
}
appDataOptions();

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.expensesMonth + ' руб');
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
