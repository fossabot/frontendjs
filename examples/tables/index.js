var database = [
    {name:"Damian",age:"25",food:"pizza"},
    {name:"Kevin",age:"14",food:"pizza"},
    {name:"David",age:"25",food:"burger"},
    {name:"Raul",age:"25",food:"burger"},
    {name:"Raul",age:"14",food:"pizza"}
];

// Table dump
var dumpTable = new Table();
dumpTable.dump(database);
dumpTable.init();

// Table the harder way :p
var myTable = new Table({search:true});
myTable.thead.add(["Name","Age","Fav.Food"]);
for(var obj of database) myTable.tbody.add([obj.name, obj.age, obj.food]);
myTable.init();