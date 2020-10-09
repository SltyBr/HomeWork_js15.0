let money = 300000, 
    income = 'Freelance 120000', 
    addExpenses = 'Rent, Food, Transport', 
    deposit = true,
    mission = 1000000, 
    period = 6,
    budgetDay = money/30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Period is equal ' + period + ' months, Mission is to get ' + mission + ' dollars');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);