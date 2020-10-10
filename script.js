let num = 266219;
let multi = 1;
let str = String(num);

let arr = str.split('');


for (let i = 0; i<arr.length; i++) {
    arr[i] = +arr[i];
}

console.log(arr);
for (let i = 0; i<arr.length; i++) {
    multi *= arr[i];
}

console.log(multi);

let power = multi**3;

console.log(power);

let strPower = String(power);

let arrPower = strPower.split('');

console.log(arrPower[0],arrPower[1]);