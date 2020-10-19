'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function ucFirst(str) {
    if (!str) {return str;}
  
    return str[0].toUpperCase() + str.slice(1);
}

let isString = function(n) {
    return Boolean(parseInt(n));
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 6,
    asking: function(){

        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome;

            do {itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Такси');}
            while (isString(itemIncome));

            let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            while (!isNumber(cashIncome)){
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            }

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
            amount = 0,
            expenses;
            
        appData.addExpenses = addExpenses.split(', ');

        for (let i = 0; i < appData.addExpenses.length; i++){
            appData.addExpenses[i] = ucFirst(appData.addExpenses[i]);
        }

        for (let i = 0; i < 2; i++) {

            expenses = prompt('Введите обязательную статью расходов?', 'Квартира');
            while (isString(expenses)){
                expenses = prompt('Введите обязательную статью расходов?', 'Квартира');
            }

            amount = prompt('Во сколько это обойдется?');    
            while (!isNumber(amount)){
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
    },
    getInfoDeposit: function(){

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        if(appData.deposit){
            appData.percentDeposit = prompt('Какой у вас годовой процент?', 10);

            while (!isNumber(appData.percentDeposit))
            {appData.percentDeposit = prompt('Какой у вас годовой процент?', 10);}

            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

            while (!isNumber(appData.moneyDeposit))
            {appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);}
        }
    },
    calcSavedMoney: function(){
        return (appData.budgetMonth * appData.period);
    }
};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

function appDataOptions() {
    console.log('Наша программа включает в себя данные: ');
    for (let key in appData)
    {console.log('Свойство: ' + key + ' Значение: ' + appData[key]);}
}
appDataOptions();

console.log('Расходы за месяц: ' + appData.expensesMonth + ' руб');
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.addExpenses);
