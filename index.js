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

var footer = new Element(["footer"]);
footer.add([["span", "my"], ["span", "footer!"]]);
footer.r();
