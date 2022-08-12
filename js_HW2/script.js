function cloneArray(arr)
{
    return [...arr];
}
function sumAndProductOfArray(arr)
{
    let resSum = 0;
    let resProduct = 1;
    for (let el of arr)
    {
        resSum += el;
        resProduct *= el;
    }
    return {sum:resSum, product: resProduct};
}
function getFirstNElements(n, arr)
{
    let res = [];
    for (let i = 0; i < n; ++i)
    {
        res[i] = arr[i];
    }
    return res;
}
function splitBySpace(str)
{
    return str.split(' ');
}
function isArray(arr)
{
    let ex = [];
    return Object.prototype.toString.call(arr) === Object.prototype.toString.call(ex);
}
function getFunctionName(func)
{
    return func.name;
}
function isWeekend(date)
{
    return date.getDay() == 0 || date.getDay() == 6;
}

function toUpper(str)
{
    return str[0].toUpperCase() + str.slice(1);
}
function camelize (str)
{
    let res = str.split('-');
    for(let i = 1; i < res.length; ++i)
    {
        res[i] = toUpper(res[i]);
    }
    return res.join("");
}
function arrayWithArraySums(array)
{
    let count = 0;
    let res = []
    for(let i = 0; i < array.length; ++i)
    {
        count += array[i];
        res[i] = count;
    }
    return res;
}
function mergeWithoutDuplicates(arr1, arr2)
{
    let res = [];
    for(let i = 0; i < arr1.length; i++)
    {
        if(res.indexOf(arr1[i]) == -1)
        {
            res.push(arr1[i]);
        }
    }
    for(let i = 0; i < arr2.length; i++)
    {
        if(res.indexOf(arr2[i]) == -1)
        {
            res.push(arr2[i]);
        }
    }
    return res;
}
function deepCopy(obj)
{
    return JSON.parse(JSON.stringify(obj))
}
function reduceOwn(arr, func, accumulator)
{
    for(let i of arr)
    {
      accumulator = func(accumulator, i);
    }
    return accumulator;
}
function isObjectsEqual(obj1, obj2)
{
    if(Object.keys(obj1).length != Object.keys(obj2).length)
    {
        return false;
    }
    for (let key1 in obj1)
    {
        let flag = false;
        let el1 = obj1[key1];
        for (let key2 in obj2)
        {
            let el2 = obj2[key2];
            if(key1.toString == key2.toString && el1 == el2)
            {
                flag = true;
                break;
            }
        }
        if(!flag)
        {
            return false;
        }
    }
    return true;
}