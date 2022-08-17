let size;
let ex;
const colors = ['red','blue','green','yellow','purple','aquamarine'];
let score = 0;
class colorLines
{
    matrix = [];
    constructor()
    {
        for(let i = 0; i < size; i++)
        {
            let arr = [];
            for(let j = 0; j < size; j++)
            {
                arr.push(0);
            }
            this.matrix.push(arr);
        }
    }
    isPathBetweenPointsUtil(p1, p2)
    {
        return this.isPathBetweenPoints(p1, p2, JSON.parse(JSON.stringify(this.matrix)))
    }

    isPathBetweenPoints(p1, p2, mat)
    {
        mat[p1.getX()][p1.getY()] = 5;
      
        let points = this.getAccessiblePoints(p1, mat);
      
        if (points.length >= 1)
        {
            for (let i = 0; i < points.length; i++)
            {
                const notVisited = mat[points[i].getX()][points[i].getY()] === 0;
                
                if (points[i].isEqual(p2) || (notVisited && this.isPathBetweenPoints(points[i], p2, mat)))
                {
                    return true;
                }
            }
        }
        return false;
    }
      
    getAccessiblePoints(p, mat)
    {
        let x = p.getX();
        let y = p.getY();

        let points = [];
        
        if(y - 1 >= 0 && mat[x][y - 1] === 0)//dzax
        {
            points.push(new Pair(x, y - 1));
        }
        if(y + 1 < size && mat[x][y + 1] === 0)//aj
        {
            points.push(new Pair(x, y + 1));
        }
        if(x - 1 >= 0 && mat[x - 1][y] === 0)//verev
        {
            points.push(new Pair(x - 1, y));
        }
        if(x + 1 < size && mat[x + 1][y] === 0)//nerqev
        {
            points.push(new Pair(x + 1, y));
        }
        return points;
    }
    move(p1, p2)
    {
        if(this.matrix[p1.getX()][p1.getY()] !== 0 && this.matrix[p2.getX()][p2.getY()] === 0 && this.isPathBetweenPointsUtil(p1, p2))
        {
            this.matrix[p2.getX()][p2.getY()] = this.matrix[p1.getX()][p1.getY()];
            this.matrix[p1.getX()][p1.getY()] = 0;
            if(!Boolean(this.clearLineIfCan(p2)))
            {
                for(let i = 0; i < 3; ++i)
                {
                    let p = this.randomGeneratorPair();
                    let v = this.randomGeneratorColorValue();
                    this.matrix[p.getX()][p.getY()] = colors[v];
                    this.clearLineIfCan(p);
                }
            }
        }
        if(this.matrix[p1.getX()][p1.getY()] !== 0)
        {
            console.log(0);
        }
        if(this.matrix[p2.getX()][p2.getY()] === 0)
        {
            console.log(1);
        }
        if(this.isPathBetweenPointsUtil(p1, p2))
        {
            console.log(2);
        }
    }
    clearLineIfCan(p)
    {
        let x = p.getX();
        let y = p.getY();
        let val = this.matrix[x][y];

        let count = 0;
        let startPoint = y;
        for(let i = y; i >= 0; --i)//finding start horisontal
        {
            if(this.matrix[x][i] == val)
            {
                startPoint = i;
            }
        }
        for(let i = startPoint; i < size; ++i)//count of color balls
        {
            if(this.matrix[x][i] == val)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        if(count >= 5)//clearing balls
        {
            score += count;
            for(let i = startPoint; i < startPoint + count; ++i)
            {
                this.matrix[x][i] = 0;
            }
            return 1;
        }

        count = 0;
        startPoint = x;
        for(let i = x; i >= 0; --i)//finding start vertical
        {
            if(this.matrix[i][y] == val)
            {
                startPoint = i;
            }
        }
        for(let i = startPoint; i < size; ++i)//count of color balls
        {
            if(this.matrix[i][y] == val)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        if(count >= 5)//clearing balls
        {
            score += count;
            for(let i = startPoint; i < startPoint + count; ++i)
            {
                this.matrix[i][y] = 0;
            }
            return 2;
        }

        count = 0;
        let startPointX = x;
        let startPointY = y;
        for(let i = x, j = y; i >= 0 && j >= 0; --i, --j)//finding start \
        {
            if(this.matrix[i][j] == val)
            {
                startPointX = i;
                startPointY = j;
            }
        }
        for(let i = startPointX, j = startPointY; i < size && j < size; ++i, ++j)//count of color balls
        {
            if(this.matrix[i][j] == val)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        if(count >= 5)//clearing balls
        {
            score += count;
            for(let i = startPointX, j = startPointY; i < size && j < size; ++i, ++j)
            {
                if(this.matrix[i][j] == val)
                {
                    this.matrix[i][j] = 0;
                }
                else
                {
                    break;
                }
            }
            return 3;
        }

        count = 0;
        startPointX = x;
        startPointY = y;
        for(let i = x, j = y; i >= 0 && j < size; --i, ++j)//finding start /
        {
            if(this.matrix[i][j] == val)
            {
                startPointX = i;
                startPointY = j;
            }
        }
        for(let i = startPointX, j = startPointY; i < size && j >= 0; ++i, --j)//count of color balls
        {
            if(this.matrix[i][j] == val)
            {
                count++;
            }
            else
            {
                break;
            }
        }
        if(count >= 5)//clearing balls
        {
            score += count;
            for(let i = startPointX, j = startPointY; i < size && j >= 0; ++i, --j)
            {
                if(this.matrix[i][j] == val)
                {
                    this.matrix[i][j] = 0;
                }
                else
                {
                    break;
                }
            }
            return 4;
        }
        return false;



    }
    randomGeneratorPair()
    {
        if(this.isFull())
        {
            return null;
        }
        let randomX = Math.floor(Math.random() * size);
        let randomY = Math.floor(Math.random() * size);
        while(this.matrix[randomX][randomY])
        {
            randomX = Math.floor(Math.random() * size);
            randomY = Math.floor(Math.random() * size);
        }
        return new Pair(randomX, randomY);
    }
    randomGeneratorColorValue()
    {
        return Math.floor(Math.random() * colors.length);
    }
    isFull()
    {
        for(let i = 0; i < size; ++i)
        {
            for(let j = 0; j < size; ++j)
            {
                if(!this.matrix[i][j])
                {
                    return false;
                }
            }
        }
        return true;
    }
    getStarterArea()
    {
        for(let i = 0; i < 3; ++i)
        {
            let p = this.randomGeneratorPair();
            let c = this.randomGeneratorColorValue();
            this.matrix[p.getX()][p.getY()] = colors[c];
        }
    }
    printArea()
    {
        let str = "    ";
        for(let i = 0; i < size; ++i)
        {
            str += `${i}  `; 
        }
        console.log(str);
        for(let i = 0; i < size; ++i)
        {
            let str = `${i}   `;
            for(let j = 0; j < size; ++j)
            {
                str += this.matrix[i][j] + "  "
            }
            console.log(str);
        }
    }
}
class Pair
{
    x;
    y;
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    isEqual(a)
    {
        return this.getX() == a.getX() && this.getY() == a.getY()
    }
}

// let ex = new colorLines();
// ex.getStarterArea();
// ex.printArea();

// while(!ex.isFull())
// {
//     let Fx = prompt("First x:");
//     let Fy = prompt("First y:");
//     let Sx = prompt("Second x:");
//     let Sy = prompt("Second y:");
//     p1 = new Pair(+Fx, +Fy);
//     p2 = new Pair(+Sx, +Sy);
//     console.log(p1)
//     console.log(p2)
//     ex.move(p1, p2);
//     ex.printArea();
// }
 

let isColorClicked = false;
let x, y;
function create()
{
    let el = document.createElement('table')
    for(let i = 0; i < size; i++)
    {
        let tr = document.createElement('tr');
        for(let j = 0; j < size; j++)
        {
            let td = document.createElement('td');
            if(ex.matrix[i][j] !== 0 )
            {
                td.style.backgroundColor = ex.matrix[i][j];
                td.onclick = () =>
                {
                    x = i;
                    y = j;
                    isColorClicked = true;
                    console.log(x, y);
                }
            }
            if(ex.matrix[i][j] === 0)
            {
                td.style.backgroundColor = ex.matrix[i][j];

                td.onclick = () =>
                {
                    if(isColorClicked)
                    {
                        ex.move(new Pair(x, y), new Pair(i, j));
                        el.parentNode.removeChild(el);
                        create();
                    }
                }
            
            }
            tr.appendChild(td);
            el.appendChild(tr);
            let body = document.querySelector('body');
            body.appendChild(el);
        }
    }
}



function enterSize()
{
    
    let input = document.querySelector('input')
    size = input.value;
    if(size < 5 || size > 20)
    {
        input.value = 5;
        return;
    }
    let el = document.querySelector('table')
    if(el?.childElementCount)
    {
        el.parentNode.removeChild(el);
    }
    ex = new colorLines();
    ex.getStarterArea();
    ex.printArea();
    create();
}