var database = [
  { name:"Damian", age:25, food:"Pizza"},
  { name:"Elon" , age:48 , food:"Caviar" },
  { name:"Bob" , age:12 , food:"Pizza" },
  { name:"Steve" , age:25 , food:"Burger" },
  { name:"Damian" , age:12 , food:"Salad" },
  { name:"Bob" , age:55 , food:"Caviar" },
  { name:"Obama" , age:99 , food:"Pizza" },
  { name:"Elon" , age:55 , food:"Salad" },
  { name:"Kevin" , age:12 , food:"Burgers" }
];

// Search
const moboSearch = new Search({
  type:"text",
  placeholder:"Search...",
  in:"people"
});
moboSearch.init();

// Table
var myTable = new Table({id:"people"});
myTable.theadAddRow(["Name","Age","Food"]);

for(var i = 0; i < database.length; i++){
  var obj = database[i];
  myTable.tbodyAddRow([obj.name, obj.age, obj.food]);
}
myTable.init();

var testBtn = new Element(["button", "Swap"]);
testBtn.on("click", function(){
  console.log("SWAP");
  myTable.swap(["Damian","1337","Javascript"]);
});

testBtn.init();