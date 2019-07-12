var option1 = new Element(["div"]);
option1.add(["p","Hello World! 1"]);
option1.init();

var option1_1 = new Element(["div", ["p","Hello World! 1.1"]]);
option1_1.init();

var option2 = createNode(["div", ["p","Hello World! 2"]]);
document.body.appendChild(option2);

var option3 = new Element(["div"]);
var option3_p = new Element(["p"]);
option3_p.initNode(option3);
option3.init();
option3_p.text("Hello World! 3");

var option4 = new Element(["div"]);
var option4_arr = ["Hello ","World! ", "4"];
for(let value of option4_arr) option4.text(value);
option4.init();
