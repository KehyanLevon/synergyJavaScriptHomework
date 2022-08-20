// export {foo};

class User
{
    firstName;
    lastName;
    userName;
    password;
    list = [];//tasklist
    constructor(firstName, lastName, userName, password)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
}
function registration()
{
    let firstname = document.getElementById('firstnameReg');
    let lastname = document.getElementById('lastnameReg');
    let username = document.getElementById('usernameReg');
    let password = document.getElementById('pw');

    if(password.value.length < 8)
    {
        alert('password is not correct');
    }
    else
    {
        let user = new User(firstname.value, lastname.value, username.value, password.value);

        if(localStorage.getItem(username.value) === null)
        {
            localStorage.setItem(username.value, JSON.stringify(user));
            location.href = 'userToDoList.html';
            localStorage.currentUser = username.value;
        }
        else
        {
            alert('same user is already registered');
        }
    }
}
function login()
{
    let username = document.getElementById('userName');
    let password = document.getElementById('userPw');
    let user = JSON.parse(localStorage.getItem(username.value));
    if(user !== null && user.password === password.value)
    {

        location.href = 'userToDoList.html';

        localStorage.currentUser = username.value;

    }
    else
    {
        alert("same user not exist"); 
    }
}