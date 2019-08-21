const data = [
    {name:"Damian", age:25, hobby:"coding"},
    {name:"Sarah", age:20, hobby:"gaming"}
];

const data2 = [
    {name:"David", age:16, hobby:"drawing"},
    {name:"Filip", age:12, hobby:"skating"}
]

const data3 = [
    {name:"Kevin", age:35, hobby:"fishing"},
    {name:"Joe", age:24, hobby:"cooking"}
]

const json = JSON.stringify(data3);

const table = new Table(data, { dynamic:true, caption:"Users", search:true });
table.preload(data2, "Fans");
table.preload(json, "Members");
table.init();