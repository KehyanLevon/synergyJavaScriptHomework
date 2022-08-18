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
    {        this.salarySum -= this.employees[employeeId].salary;
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
function isTrueNumber(num)
{
    return !isNaN(+num);
}
let emp1= new Employee("lastName1", 100, "10-10-2000","11-03-2022")
let emp2= new Employee("lastName2", 200, "08-07-2000","03-05-2020")
let emp3= new Employee("lastName3", 140, "10-10-2000","01-03-2021")
let emp4= new Employee("lastName4", 390, "10-10-2000","04-06-1918")
let emp5 = new Employee("lastName5", 400, "10-10-2000","04-06-1918")
let emp6 = new Employee("lastName6", 160, "10-10-2000","04-06-1918")
Production.addEmployee(emp1);
Production.addEmployee(emp2);
Production.addEmployee(emp3);
Production.addEmployee(emp4);
Production.addEmployee(emp5);
Production.addEmployee(emp6);

let body = document.querySelector('body');

function reCreateTables()
{
    let tableProduction = document.getElementById('productionTable');
    let tableEmployees = document.getElementById('employeesTable');
    tableProduction.parentNode.removeChild(tableProduction);
    tableEmployees.parentNode.removeChild(tableEmployees);
    createTableProduction();
    createTableEmployees();
}
function addEmployeesBtn()
{
    let count = prompt('how many employees do you want add?')
    count = isTrueNumber(count) ? +count : -1;
    if(count >= 0 && count < 10)
    {
        for(let i = 0; i < count; ++i)
        {
            let empLastName = prompt(`enter lastname of new employee (${i + 1}):`)
            let empSalary = prompt(`enter salary of new employee (${i + 1}):`)
            let empBirthday = prompt(`enter birthday(exmp **-**-****) of new employee (${i + 1}):`)
            let empEmploymentDate = prompt(`enter employment date(exmp **-**-****) of new employee (${i + 1}):`)
            if(isTrueNumber(empSalary) && new Date(empBirthday) != 'Invalid Date' && new Date(empEmploymentDate) != 'Invalid Date')
            {
                Production.addEmployee(new Employee(empLastName, empSalary, empBirthday, empEmploymentDate));
            }
        }
    }
    reCreateTables();
}
function removeEmployeesBtn()
{
    let id = prompt('enter Id of employee that have to be removed');
    if(isTrueNumber(id) && id >= 0 && id < Production.employees.length)
    {
        id = +id;
        let table = document.getElementById('employeesTable');
        let trs = table.children;
        for(let i = 1; i < trs.length; ++i)
        {
            let tds = trs[i].children;
            if(tds[0].innerText == id);
            {
                for(let j = 0; j < tds[i].length; ++j)
                {
                    tds[i].parentNode.removeChild(tds[i]);
                }
                Production.deleteEmployee(id);
                reCreateTables();
                return;
            }
        }
    }
}

function createTableProduction()//productionTable
{
    let table = document.createElement('table');
    table.id = 'productionTable';
    
    let trHead = document.createElement('tr')
    let tdNameHead = document.createElement('td')
    let tdCountOfEmployeesHead = document.createElement('td')
    let tdSalarySumHead = document.createElement('td')
    let tdMonthlyProfitHead = document.createElement('td')

    tdNameHead.innerText = 'name';
    tdCountOfEmployeesHead.innerText = 'count of employees';
    tdSalarySumHead.innerText = 'salary sum';
    tdMonthlyProfitHead.innerText = 'monthly profit';

    trHead.appendChild(tdNameHead);
    trHead.appendChild(tdCountOfEmployeesHead);
    trHead.appendChild(tdSalarySumHead);
    trHead.appendChild(tdMonthlyProfitHead);

    table.appendChild(trHead);

    // let table = document.getElementById('productionTable');
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdCountOfEmployees = document.createElement('td');
    let tdSalarySum = document.createElement('td');
    let tdMonthlyProfit = document.createElement('td');

    tdName.innerText = Production.name;
    tdCountOfEmployees.innerText = Production.employees.length;
    tdSalarySum.innerText = Production.salarySum;
    tdMonthlyProfit.innerText = Production.monthlyProfit;

    tr.appendChild(tdName);
    tr.appendChild(tdCountOfEmployees);
    tr.appendChild(tdSalarySum);
    tr.appendChild(tdMonthlyProfit);
    
    table.appendChild(tr);
    body.appendChild(table);
}
function createTableEmployees()//employeesTable
{
    let table = document.createElement('table');
    table.id = 'employeesTable';

    let trHead = document.createElement('tr')

    let tdIdHead = document.createElement('td')
    let tdLastNameHead = document.createElement('td')
    let tdSalaryHead = document.createElement('td')
    let tdBirthdayHead = document.createElement('td')
    let tdEmploymentDateHead = document.createElement('td')

    tdIdHead.innerText = 'id';
    tdLastNameHead.innerText = 'last name';
    tdSalaryHead.innerText = 'salary';
    tdBirthdayHead.innerText = 'birthday';
    tdEmploymentDateHead.innerText = 'emoployment date';

    trHead.appendChild(tdIdHead);
    trHead.appendChild(tdLastNameHead);
    trHead.appendChild(tdSalaryHead);
    trHead.appendChild(tdBirthdayHead);
    trHead.appendChild(tdEmploymentDateHead);

    table.appendChild(trHead);

    for(let i = 0; i < Production.employees.length; ++i)
    {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdLastName = document.createElement('td');
        let tdSalary = document.createElement('td');
        let tdBirthday = document.createElement('td');
        let tdEmploymentDate = document.createElement('td');

        tdId.innerText = i;
        tdLastName.innerText = Production.employees[i].lastName;
        tdSalary.innerText = Production.employees[i].salary;
        tdBirthday.innerText = Production.employees[i].birthday;
        tdEmploymentDate.innerText = Production.employees[i].employmentDate;

        tr.appendChild(tdId);
        tr.appendChild(tdLastName);
        tr.appendChild(tdSalary);
        tr.appendChild(tdBirthday);
        tr.appendChild(tdEmploymentDate);

        table.appendChild(tr);
    }
    body.appendChild(table);
}
createTableProduction();
createTableEmployees();