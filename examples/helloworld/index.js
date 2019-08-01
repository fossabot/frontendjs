var option1 = new Element(["div"]);
option1.add(["p","Hello World! 1"]);
option1.init();

var option1_1 = new Element(["div", ["p","Hello World! 1.1"]]);
option1_1.init();

var option2 = createNode(["div", ["p","Hello World! 2"]]);
document.body.appendChild(option2);


var option3 = new Element(["div"]);
var option3_arr = ["Hello ","World! ", "3"];
for(let value of option3_arr) option3.text(value);
option3.init();
