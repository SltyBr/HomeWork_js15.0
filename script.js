'use strict';

const startBtn = document.getElementById('start'),
    incomeBtn = document.getElementsByTagName('button')[0],
    expencesBtn = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthVal = document.getElementsByClassName('budget_month-value')[0],
    budgetDayVal = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeVal = document.getElementsByClassName('additional_income-value')[0],
    addExpensesVal = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodVal = document.getElementsByClassName('income_period-value')[0],
    targetMonthVal = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    addIncomeTitle = document.querySelector('.income-items .income-title'),
    addIncomeAmount = document.querySelector('.income-amount'),
    mainIncomeTitle = document.querySelector('.expenses-items .expenses-title'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');
    let expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItem = document.querySelectorAll('.income-items'),
        periodAmount = document.querySelector('.period-amount');

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

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getTargetMonth();
        appData.getStatusIncome();
        /*  appData.getInfoDeposit(); */
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        if (!isNumber(salaryAmount.value)) {
            startBtn.setAttribute = 'disabled';
            return (salaryAmount.value = null);
        }

        budgetMonthVal.value = appData.budgetMonth;
        budgetDayVal.value = Math.ceil(appData.budgetDay);
        expensesMonthVal.value = appData.expensesMonth;
        addExpensesVal.value = appData.addExpenses.join(', ');
        addIncomeVal.value = appData.addIncome.join(',');
        targetMonthVal.value = Math.ceil(appData.getTargetMonth());
        incomePeriodVal.value = appData.calcSavedMoney();
        
        periodSelect.addEventListener('input', function(){
            incomePeriodVal.value = appData.calcSavedMoney();
        });

    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expencesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expencesBtn.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }

    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeBtn);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3){
            incomeBtn.style.display = 'none';
        }
    },
    getAddExpenses: function(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        addIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {

        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
        return (appData.expensesMonth);
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    getTargetMonth: function () {
        return targetAmount.value /appData.budgetMonth;
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
        return (appData.budgetMonth * periodSelect.value);
    }
};

startBtn.addEventListener('click', appData.start);

expencesBtn.addEventListener('click', appData.addExpensesBlock);
incomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});
/* 

function appDataOptions() {
    console.log('Наша программа включает в себя данные: ');
    for (let key in appData)
    {console.log('Свойство: ' + key + ' Значение: ' + appData[key]);}
}
appDataOptions();
*/
