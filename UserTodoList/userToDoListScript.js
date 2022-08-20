let body = document.querySelector('body');
let user = JSON.parse(localStorage.getItem(localStorage.currentUser));
let statuses = 
{
    w: 'waiting for a response',
    a: 'active',
    c: 'completed',
    d: 'denied',
    r: 'rejected'
};  
class Task
{
    title;
    discription;
    status = statuses.w;
    constructor(title, discription, status)
    {
        if(status === undefined || status === null)
        {
            status = 'w';
        }
        this.title = title.trim();
        this.discription = discription.trim();
        this.status = statuses[status.trim()];
    }
}
user.addTask = function(title, discription, status)
{
    user.list.push(new Task(title, discription, status))
}
user.removeTask = function(task)
{
    user.list.splice(user.list.indexOf(task) - 1, 1);
}
if(localStorage.currentUser)
{
    let user = JSON.parse(localStorage.getItem(localStorage.currentUser));
    createToDoTable(user);
}
else
{
    alert('error');
}

function createToDoTable()
{
    let title = document.getElementById('title');
    title.innerText = `${user.firstName} ${user.lastName} to do list`;
    let tbody = document.querySelector('tbody');
    let table = document.getElementById('toDoTable');

    if(tbody?.childElementCount > 0)
    {
        tbody.parentNode.removeChild(tbody);
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    for (let us of user.list)
    {
        let tdRemoveBtn = document.createElement('button');
        tdRemoveBtn.onclick = () => 
        {
            user.removeTask(us);
            createToDoTable();
        };


        let dis = us.discription;
        let title = us.title;
        let status = us.status;

        let tr = document.createElement('tr');
        let distd = document.createElement('td')
        let titletd = document.createElement('td')
        let statustd = document.createElement('td')

        distd.innerText = dis;
        titletd.innerText = title;
        statustd.innerText = status;

        tr.appendChild(distd);
        tr.appendChild(titletd);
        tr.appendChild(statustd);
        tr.appendChild(tdRemoveBtn);
        tbody.appendChild(tr);
    }
    localStorage.setItem(user.userName,JSON.stringify(user))
}

function recreateToDoTable()
{
    document.getElementById('toDoTable').remove();
    createToDoTable();
}

function addTaskbtn()
{
    let title = document.getElementById('titleInput');
    let discription = document.getElementById('discription');
    let status = document.getElementById('statuses');
    
    user.addTask(title.value, discription.value, status.value);

    createToDoTable()
}