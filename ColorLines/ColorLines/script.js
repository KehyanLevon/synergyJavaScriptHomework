const { log } = require("console");
let rl = require("readline");
let prompts = rl.createInterface(process.stdin, process.stdout);

const size = 9;
const colors = ['r','b','g','y','p','a'];//red blue green yellow purple azure
let score = 0;
class colorLines
{
    matrix;
    constructor()
    {
        this.matrix =
        [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    }
    isPathBetweenPointsUtil(p1, p2)
    {
        return this.isPathBetweenPoints(p1, p2, JSON.parse(JSON.stringify(this.matrix)))
    }

    isPathBetweenPoints(p1, p2, mat)
    {
        mat[p1.getY()][p1.getX()] = 5;
      
        let points = this.getValidSib(p1, mat);
      
        if (points.length >= 1)
        {
            for (let i = 0; i < points.length; i++)
            {
                const notVisited = mat[points[i].getY()][points[i].getX()] === 0;
                
                if (points[i].isEqual(p2) || (notVisited && this.isPathBetweenPoints(points[i], p2, mat)))
                {
                    return true;
                }
            }
        }
        return false;
    }
      
    getValidSib(p, mat)
    {
        // const { x, y } = cord;
        let x = p.getX();
        let y = p.getY();

        let points = [];
        
        if (mat[y - 1] !== undefined && mat[y - 1][x] === 0)
        {
            points.push(new Pair(x , y - 1));
        }
        if (mat[y + 1] !== undefined && mat[y + 1][x] === 0)
        {
            points.push(new Pair(x, y + 1));
        }
        if (mat[y][x - 1] !== undefined && mat[y][x - 1] === 0)
        {
            points.push(new Pair(x - 1, y));
        }
        if (mat[y][x + 1] !== undefined && mat[y][x + 1] === 0)
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
        //if(this.matrix[p1.getX()][p1.getY()] !== 0)
        //{
        //    console.log(0);
        //}
        //if(this.matrix[p2.getX()][p2.getY()] === 0)
        //{
        //    console.log(1);
        //}
        //if(this.isPathBetweenPointsUtil(p1, p2))
        //{
        //    console.log(2);
        //}
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

let ex = new colorLines();
ex.getStarterArea();
ex.printArea();


function wait()
{
    if (!ex.isFull()) {
        prompts.question("First x: ", function (Fx) {
            prompts.question("First y: ", function (Fy) {
                prompts.question("Second x: ", function (Sx) {
                    prompts.question("Second y: ", function (Sy) {
                        if (isTrueNum(Fx) && isTrueNum(Fy) && isTrueNum(Sx) && isTrueNum(Sy)) {
                            
                            console.log(isTrueNum(Fx));
                            console.log(Fy);
                            console.log(Sx);
                            console.log(Sy);
                            p1 = new Pair(+Fx, +Fy);
                            p2 = new Pair(+Sx, +Sy);
                            ex.move(p1, p2);
                            ex.printArea();
                        }
                        else {
                            console.log('input correct coordinates');
                        }
                        wait();
                    })
                })
            })
        })
    }
    else {
        return;
    }
}
wait();
function isTrueNum(arg) {
    if (typeof +arg == 'number' && !isNaN(+arg)) {
        return true;
    }
    return false;
}