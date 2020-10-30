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

const AppData = function(){
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
};

AppData.prototype.start = function(){
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
};

const appData = new AppData();

console.log(appData);

/* let start = appData.start.bind(appData), // привязываем метод к объекту appData
    reset = appData.reset.bind(appData); // привязываем метод к объекту appData


startBtn.addEventListener('click', function(){start();}); // функция старт по событию клик
resetBtn.addEventListener('click', function(){reset();}); // функция сброса по событию клик
expensesBtn.addEventListener('click', appData.addExpensesBlock); 
incomeBtn.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
}); */