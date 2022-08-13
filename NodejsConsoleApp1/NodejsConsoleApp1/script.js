function merge(leftArr, rightArr)
{
    let res = [], leftId = 0, righId = 0;
    while(leftId < leftArr.length && righId < rightArr.length)
    {
        let leftEl = leftArr[leftId], rightEl = rightArr[righId];
        if(leftEl >= rightEl)
        {
            res.push(rightEl);
            righId++;
        }
        else
        {
            res.push(leftEl);
            leftId++;
        }
    }
    return [...res, ...leftArr.slice(leftId), ...rightArr.slice(righId)];
}
function mergeSort(arr)
{
    if(arr.length <= 1)
    {
        return arr;
    }
    let middle = Math.floor(arr.length / 2),
        leftArr = arr.slice(0, middle),
        rightArr = arr.slice(middle);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function daysBetween(date1, date2)
{
    return parseInt((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}
function Employee(lastName, salary, birthday, employmentDate)
{
    this.lastName = lastName,
    this.salary = salary,
    this.birthday = new Date(birthday),
    this.employmentDate = new Date(employmentDate),
    this.getExperience = function()
    {
        const year = Math.floor(this.getExperienceInDays() / 365);
        const month = Math.floor((this.getExperienceInDays() - year * 365) / 30);
        const day = Math.floor(this.getExperienceInDays() - year * 365 - month * 30);
        return `years:${year} months:${month} day:${day}`;
    }
    this.getExperienceInDays = function()
    {
        let date = new Date();
        return daysBetween(date,this.employmentDate);
    }
    this.getAge = function()
    {
        let date = new Date();
        return new Date(date - this.birthday).getFullYear() - 1970;
    }
    this.getDaysUntilRetirement = function()
    {
        return daysBetween(new Date(this.birthday.getFullYear() + 65, this.birthday.getMonth() - 1, this.birthday.getDate()), new Date());
    }
    this[Symbol.toPrimitive] = function(hint)
    {
        if (hint === 'number')
        {
            return 1;
        }
        else if (hint === 'string')
        {
            return 2;
        }
        return null;
    }
}

let Production = 
{
    name:"TestProduction",
    employees: [],
    salarySum: 0,
    monthlyProfit:5000,
    addEmployee: function(employee)
    {
        this.employees.push(employee);
        this.salarySum += employee.salary;
        this.monthlyProfit -= employee.salary;
    },
    deleteEmployee: function(employeeId)
    {
        this.salarySum -= this.employees[employeeId].salary;
        this.monthlyProfit += this.employees[employeeId].salary;
        this.employees.splice(employeeId, 1);
    },
    getAvgSalary: function()
    {
        return this.salarySum / this.employees.length;
    },
    [Symbol.toPrimitive]: function(hint)
    {
        if (hint === 'number')
        {
            return 1;
        }
        else if (hint === 'string')
        {
            return 2;
        }
        return null;
    }
}
let emp1 = new Employee("lastname1", 100, "10-10-2000","11-03-2022")
let emp2 = new Employee("lastname2", 200, "08-07-2000","03-05-2020")
let emp3 = new Employee("lastname3", 140, "10-10-2000","01-03-2021")
let emp4 = new Employee("lastname4", 390, "10-10-2000","04-06-1918")
let emp5 = new Employee("lastname5", 400, "10-10-2000","04-06-1918")
let emp6 = new Employee("lastname6", 160, "10-10-2000","04-06-1918")
Production.addEmployee(emp1);
Production.addEmployee(emp2);
Production.addEmployee(emp3);
Production.addEmployee(emp4);
console.log(Production);
const { log } = require("console");
//production.addemployee(emp5);
//console.log(production);
//production.addemployee(emp6);
//console.log(production);
//production.deleteemployee(0);
//console.log(production);
//production.deleteemployee(4);
//console.log(production);

var rl = require("readline");
var prompts = rl.createInterface(process.stdin, process.stdout);
prompts.question("press y to exit: ", function (key)
{
    if (key == 'y'
    {
        console.log("Application is stoped");
        process.exit();
    }
    else
    {
        console.log('press y to exit: ')
    }
})
let stdIn = process.openStdin();
stdIn.on('keypress', function (a)
{
    if (a == 'y')
    {
        process.exit();
    }
});