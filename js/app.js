var conf = {
  domain: "FrontendJS"
};

var nav = new Node(["nav"]);
var main = new Node(["main"]);

nav.add([
  ["a", { href:"#home" }, "Home"],
  ["a", { href:"#signup" }, "Signup"],
  ["a", { href:"#slideshow" }, "Slideshow"]
]);

nav.init();
main.init();
