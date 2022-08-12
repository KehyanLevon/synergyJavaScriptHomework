let users = [
    {
        name:"name1",
        age:5
    },
    {
        name:"name2",
        age:10
    },
    {
        name:"name3",
        age:2
    },
    {
        name:"name4",
        age:23
    },
    {
        name:"name5",
        age:7
    },
]

console.log(users.sort((a, b)=>a.age - b.age));

