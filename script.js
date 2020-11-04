'use strict';

const startBtn = document.getElementById('start'),
    incomeBtn = document.getElementsByTagName('button')[0],
    expensesBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
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
    resetBtn = document.getElementById('cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
    let expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItems = document.querySelectorAll('.income-items'),
        periodAmount = document.querySelector('.period-amount');   

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const ucFirst = (str) => {
    if (!str) {return str;}
  
    return str[0].toUpperCase() + str.slice(1);
};

const isString = (n) => {
    return Boolean(parseInt(n));
};

const removeItems = (obj) => { // функция удаления элемента из DOM дерева по условию
    for (let key in obj){
        if (key > 0){
            obj[key].remove();
        }
    }
};

class AppData {
    constructor(){
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
    }

    start(){

        if (!isNumber(salaryAmount.value)) {
            startBtn.setAttribute = 'disabled';
        return (salaryAmount.value = '');}



        let inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach( (el) => {
            el.disabled = true;
        });
    
    
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
    }

    showResult(){

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
        periodSelect.addEventListener('input', () => {
            incomePeriodVal.value = this.calcSavedMoney();
        });
    }

    addExpensesBlock(){
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
    }

    addIncomeBlock(){
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
    }

    getExpInc(){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    
            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };
    
        incomeItems.forEach(count);
        expensesItems.forEach(count);
    
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== ''){
                this.addExpenses.push(item);
            }
        }); 
    }

    getAddIncome(){
        addincomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }); 
    }

    getExpensesMonth(){
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
        return (this.expensesMonth);  
    }

    getBudget(){
        const monthDeposit = this.moneyDeposit * this.percentDeposit;

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth/30;  
    }

    getTargetMonth(){
        return targetAmount.value /this.budgetMonth;
    }

    calcSavedMoney(){
        return (this.budgetMonth * periodSelect.value); 
    }

    reset(){
        let inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach( (el) => {
            el.disabled = false;
            el.value = null;
        });
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';
    
        incomeBtn.style.display = 'block';
        expensesBtn.style.display = 'block';

        depositCheck.checked = false;
        depositBank.value = '0';
        depositAmount.value = '';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
    
        removeItems(incomeItems);
        removeItems(expensesItems);
    
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

    getInfoDeposit(){
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;    
        }
        if (this.deposit && depositPercent.style.display === 'inline-block'){
            this.percentDeposit = depositPercent.value/100;
            this.moneyDeposit = depositAmount.value; 
        }
    }

    changePercent(){
        
        depositPercent.addEventListener('keydown', (event) =>{ // запрещаем вводить пробел
            if (event.code === 'Space'){
                event.preventDefault();
            }
        });

        depositPercent.addEventListener('change', ()=>{
            if (!isNumber(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0){
                alert('Введите корректный процент');
                depositPercent.value = null;
            }
        });
        
        let valueSelect = this.value;
        if (valueSelect === 'other'){
            valueSelect = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = valueSelect;
        } else{
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    depositHandler(){

        if (depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else{
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '0';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }

        depositAmount.addEventListener('change', ()=>{
            if (!isNumber(depositAmount.value)){
                alert('Введите корректнyю сумму');
                depositAmount.value = null;
            }
        });

    }

    eventListeners(){

        startBtn.addEventListener('click', this.start.bind(this)); 
    
        resetBtn.addEventListener('click', this.reset.bind(this));
    
        expensesBtn.addEventListener('click', this.addExpensesBlock);
    
        incomeBtn.addEventListener('click', this.addIncomeBlock);
    
        periodSelect.addEventListener('input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();

appData.eventListeners();
