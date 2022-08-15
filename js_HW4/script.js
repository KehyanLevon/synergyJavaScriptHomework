class Queue
{
    constructor(...arr)
    {
        this.arr = [...arr];
    }
    enqueue(e)
    {
        this.arr.push(e);
    }
    dequeue()
    {
        if(this.isEmpty())
        {
            return null;
        }
        let first = this.first();
        this.arr.splice(0,1);
        return first;
    }
    first()
    {
        if(this.isEmpty())
        {
            return null;
        }
        return this.arr[0];
    }
    size()
    {
        return this.arr.length();
    }
    isEmpty()
    {
        return this.size() > 0 ? false : true;
    }
}

class Pair
{
    constructor(a, b)
    {
        this.a = a;
        this.b = b;
    }
    getA()
    {
        return this.a;
    }
    getB()
    {
        return this.b;
    }
}
class PriorityQueue
{
    arr = [];
    insert(k, v)
    {
        if(this.isEmpty())
        {
            this.arr.push(new Pair(k,v));
            return;
        }
        for(let i = 0; i < this.arr.length; ++i)
        {
            if(this.arr[i].getA() > k)
            {
                this.arr.splice(i - 1, 0, new Pair(k, v));
                return;
            }
        }
        this.arr.push(new Pair(k, v));
    }
    min()
    {
        if(this.isEmpty())
        {
            return null;
        }
        return this.arr[0];
    }
    removeMin()
    {
        if(this.isEmpty())
        {
            return null;
        }
        let min = this.min();
        this.arr.splice(0,1);
        return min;
    }
    size()
    {
        return this.arr.length;
    }
    isEmpty()
    {
        return this.size() > 0 ? false : true;
    }
}