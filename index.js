// // Examples
// document.body.appendChild(create(["p", "Hello World!"]));
// // <p>Hello World!</p>
// document.body.appendChild(create(["p", ["span","Hello World!"]]));
// // <p><span>Hello World!</span></p>
// document.body.appendChild(create(["p", ["span","Hello "], ["span","World!"]]));
// // <p><span>Hello </span><span>World!</span></p>
// // document.body.appendChild(create([["span","Hello "], ["span","World!"]]));
// // <span>Hello </span><span>World!</span>
//
// create([["span","Hello "], ["span","World!"]]).forEach(function(node){
//   document.body.appendChild(node);
// });
//
// var header = new Element(["header"]);
// header.add(["p","This is my header."]);
// header.r();
//
// var main = new Element(["main"]);
// main.add(["a", { href: "docs.html", target:"_blank" }, "Documentation"]);
// main.r();

var
header = new Element(["header"]),
main = new Element(["main"]),
aside = new Element(["aside"]),
footer = new Element(["footer"]);

header.r();
main.r();
aside.r();
footer.r();

header.add(["h1", ["span", "frontend"], ["span", { style:"color: green;" }, ".js"]]);
main.add(["span", "This is my main."]);
aside.add(["span", "This is my aside."]);
footer.add(["span", "This is my footer."]);

aside.hide();
