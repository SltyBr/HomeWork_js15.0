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
    periodSelect = document.querySelector('.period-select'),
    resetBtn = document.getElementById('cancel');
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

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.getStatusIncome();
        /*  appData.getInfoDeposit(); */
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    },
    showResult: function(){
        if (!isNumber(salaryAmount.value)) {
            startBtn.setAttribute = 'disabled';
            return (salaryAmount.value = null);
        }
        
        budgetMonthVal.value = this.budgetMonth;
        budgetDayVal.value = Math.ceil(this.budgetDay);
        expensesMonthVal.value = this.expensesMonth;
        addExpensesVal.value = this.addExpenses.join(', ');
        addIncomeVal.value = this.addIncome.join(',');
        targetMonthVal.value = Math.ceil(this.getTargetMonth());
        incomePeriodVal.value = this.calcSavedMoney();
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
            this.incomeMonth += +appData.income[key];
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

        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
        return (this.expensesMonth);
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth/30;
    },
    getTargetMonth: function () {
        return targetAmount.value /this.budgetMonth;
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
        return (this.budgetMonth * periodSelect.value);
    },
    reset: function(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.showResult();
    }
};
let start = appData.start.bind(appData);
let reset = appData.reset.bind(appData);

startBtn.addEventListener('click', function(){
    start();
    let inputs = document.querySelectorAll('input[type=text]');
    inputs.forEach( function(el){
        el.disabled = true;
    });

    if (!isNumber(salaryAmount.value)) {
        startBtn.setAttribute = 'disabled';
        return (salaryAmount.value = null);
    }

    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
});

resetBtn.addEventListener('click', function(){
    reset();
    let inputs = document.querySelectorAll('input[type=text]');

    inputs.forEach( function(el){
        el.disabled = false;
        el.value = null;
    });
    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';
});

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
