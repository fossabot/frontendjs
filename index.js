// Examples
document.body.appendChild(create(["p", "Hello World!"]));
// <p>Hello World!</p>
document.body.appendChild(create(["p", ["span","Hello World!"]]));
// <p><span>Hello World!</span></p>
document.body.appendChild(create(["p", ["span","Hello "], ["span","World!"]]));
// <p><span>Hello </span><span>World!</span></p>

create([["span","Hello "], ["span","World!"]]).forEach(function(node){
  document.body.appendChild(node);
});

var header = new Element(["header"]);
header.r();
header.add(["p","Hello World!"]);

var main = new Element(["main"]);
main.add(["p", "This is my main element."]);
main.add(["p", "Add element to main and then render it."]);
main.r();
