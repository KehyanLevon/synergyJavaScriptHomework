function min(a, b)
{
    return (a > b ? b : a);
}

function primeNumbersFromTo(a, b)
{
    function isPrime(num)
    {
        for(let i = 2; i < num; ++i)
        {
            if(num % i == 0)
            {
                return false;
            }
        }
        return true;
    }
    for(let i = a; i <= b; ++i)
    {
        if(isPrime(i))
        {
            console.log(i);
        }
    }
}
// primeNumbersFromTo(2,10)

function FirstReverse(str)
{
    let s = "";
    let i = str.length;
    while (i > 0)
    {
        s += str.substring(i - 1, i--);
    }
    return s;
}
// console.log(FirstReverse("Hello World and Coders"))

function checkSpam(str, substr)
{
    for(let i = 0; i < str.length; ++i)
    {
        if(str[i] == substr[0])
        {
            if(str.substring(i, i + substr.length) == substr)
            {
                return true;
            }
        }
    }
    return false;
}
// console.log(checkSpam('aaaadsgfriaas','aag'));
// console.log(checkSpam('aaaadsgfriaas','aas'));

{
    function priceWithTax(price, tax) {return price + price * (tax / 100);}
    function amountSpentInUsd(course, spent) {return (course * spent).toFixed(2);}
    let balance = +prompt('balance');//1000
    let inUsd = 0.34;
    let phonePrice = 213;
    let accessoryPrice = 13;
    let mentalTrashhold = +prompt('mental trashhold');//950
    let trashholdTaxPhone = 500;
    let trashholdTaxAccessory = 200;
    let tax = 7.5;
    let spent = 0;

    let countOfPhones = 0;
    let countOfAccessories = 0;

    let flag = false;
    let tmptax = 0;
    do
    {
        if(spent > trashholdTaxPhone)
        {
            if(!flag)
            {
                spent = priceWithTax(spent,tax);
                flag = true;
                tmptax=tax;
            }
            else
            {
                spent += priceWithTax(phonePrice,tax);
            }
        }
        else
        {
            spent += phonePrice;
        }
        countOfPhones++;
    }while(spent + phonePrice + phonePrice*(tmptax/100) <= balance)//

    balance -= spent;
    let amountSpent = spent;
    flag = false;
    tmptax = 0;
    spent = 0;
    do
    {
        if(spent > trashholdTaxAccessory)
        {
            if(!flag)
            {
                spent = priceWithTax(spent,tax);
                flag = true;
                tmptax = tax;
            }
            else
            {
                spent += priceWithTax(accessoryPrice,tax);
            }
        }
        else
        {
            spent += accessoryPrice;
        }
        amountSpent += priceWithTax(accessoryPrice, tmptax);
        countOfAccessories++;
    }while((spent + priceWithTax(accessoryPrice,tmptax))<= balance && countOfAccessories <= countOfPhones && amountSpent + priceWithTax(accessoryPrice,tmptax) <= mentalTrashhold)
    
    console.log(amountSpentInUsd(amountSpent, inUsd));
    //213*4 + 213%7.5 = 915.9
    //915.9+13*2=941.9
    //941.9*0.34 = 320.246
}