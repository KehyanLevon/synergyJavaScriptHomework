function max(a, b, c)
{
    if(a > b && a > c)
    {
        return a;
    }
    else if(b > a && b > c)
    {
        return b;
    }
    else
    {
        return c;
    }
}
function circleSurface(r)
{
    return Math.PI * r * r;
}
function getDecimal(num)
{
    return num - num % 1;
}
function fib(num)
{
    let num1 = 0, num2 = 1;
    for (let i = 1; i < num; i++)
    {
        nextTerm = num1 + num2;
        num1 = num2;
        num2 = nextTerm;
    }
    return num1;
}
function randomInteger (min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Pythagorean(a, b)
{
    return Math.sqrt(a * a + b * b);
}
