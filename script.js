'use strict';

const startBtn = document.getElementById('start'),
    incomeBtn = document.getElementsByTagName('button')[0],
    expensesBtn = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    addincomeItems = document.querySelectorAll('.additional_income-item'),
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
        incomeItems = document.querySelectorAll('.income-items'),
        periodAmount = document.querySelector('.period-amount');


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const ucFirst = function(str) {
    if (!str) {return str;}
  
    return str[0].toUpperCase() + str.slice(1);
};

const isString = function(n) {
    return Boolean(parseInt(n));
};

const removeItems = function(obj){ // функция удаления элемента из DOM дерева по условию
    for (let key in obj){
        if (key > 0){
            obj[key].remove();
        }
    }
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
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        /*  appData.getInfoDeposit(); */
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
        let cloneExpensesItem = expensesItems[0].cloneNode(true),
            cloneExpensesTitle = cloneExpensesItem.querySelector('.expenses-title'),
            cloneExpensesAmount = cloneExpensesItem.querySelector('.expenses-amount');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtn);
        cloneExpensesTitle.value = '';  // сбрасываем значения инпутов у новых элементов
        cloneExpensesAmount.value = ''; //
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            expensesBtn.style.display = 'none';
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
        incomeItems.forEach(function(item){
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
        let cloneincomeItems = incomeItems[0].cloneNode(true),
            cloneincomeTitle = cloneincomeItems.querySelector('.income-title'),
            cloneincomeAmount = cloneincomeItems.querySelector('.income-amount');
        incomeItems[0].parentNode.insertBefore(cloneincomeItems, incomeBtn);
        cloneincomeTitle.value = ''; // сбрасываем значения инпутов у новых элементов
        cloneincomeAmount.value = ''; //
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
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
        addincomeItems.forEach(function(item){
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
    startBtnFunc: function(){ // функция старта
        start();

        if (!isNumber(salaryAmount.value)) {
            startBtn.setAttribute = 'disabled';
            return (salaryAmount.value = null);
        }
        
        let inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach( function(el){
            el.disabled = true;
        });


        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    resetBtnFunc: function(){ // функция сброса
        reset();
        let inputs = document.querySelectorAll('input[type=text]');
    
        inputs.forEach( function(el){
            el.disabled = false;
            el.value = null;
        });
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';
    
        incomeBtn.style.display = 'block';
        expensesBtn.style.display = 'block';  

        removeItems(incomeItems);
        removeItems(expensesItems);
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
let start = appData.start.bind(appData), // привязываем метод к объекту appData
    reset = appData.reset.bind(appData); // привязываем метод к объекту appData


startBtn.addEventListener('click', appData.startBtnFunc); // функция старт по событию клик
resetBtn.addEventListener('click', appData.resetBtnFunc); // функция сброса по событию клик
expensesBtn.addEventListener('click', appData.addExpensesBlock); 
incomeBtn.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
});