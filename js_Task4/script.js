class Stack
{
    constructor(...arr)
    {
        this.arr = [...arr];
    }
    push(el)
    {
        this.arr.push(el);
    }
    top()
    {
        return this.arr[this.arr.length - 1];
    }
    pop()
    {
        let top = this.top();
        this.arr.pop();
        return top;
    }
    size()
    {
        return this.arr.length;
    }
    isEmpty()
    {
        return this.arr.length > 0?false:true;
    }
}