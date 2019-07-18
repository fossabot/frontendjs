var database = [
  {name:"Damian", age:25, hobby:"coding"},
  {name:"Kevin", age:101, hobby:"Being old"},
  {name:"Philip", age:20, hobby:"Tuning cars"}
];

// Table
var myTable = new Table({search:true});

myTable.thead.add(["Name", "Age", "Hobby"]);
myTable.tbody.add(["Damian", 25, "Coding"]);
myTable.tbody.add(["Kevin", 50, "Watching TV"]);
myTable.tbody.add(["Paul", 13, "Coding"]);
myTable.tbody.add(["KeViN", 25, "Tuning Cars"]);
myTable.tbody.add(["Philip", 13, "Coding"]);
myTable.tbody.add(["Damian", 50, "Tuning Cars"]);

myTable.init();
