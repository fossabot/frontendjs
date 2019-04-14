var header = new Element(["header"]);
var nav = new Element(["nav"]);
var main = new Element(["main"]);

header.add([["font", { id: "title" }, "frontend.js"],["a", { id:"github", href:"https://github.com/damiantoczek/frontendjs", target: "_blank" }, "Github.com"]]);
nav.add([["a", { href: "#home" }, "Home"],["a", { href: "#about" }, "About"]]);

header.init();
nav.init();
main.init();
