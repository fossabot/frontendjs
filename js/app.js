var header = new Element(["header"]);
var nav = new Element(["nav"]);
var main = new Element(["main"]);

header.add(["font", { id: "title" }, "frontend.js"]);
nav.add([["a", { href: "#home" }, "Home"],["a", { href: "#about" }, "About"], ["a", { href: "#" }, "Test"]]);
main.add(["p", "Hello World!"]);

header.init();
nav.init();
main.init();

nav.findNode("A").forEach(function(x){
  x.addEventListener("click", function(){
    console.log("CLICKED");
  });
});

nav.on("click", function(){
    console.log("ON");
});
