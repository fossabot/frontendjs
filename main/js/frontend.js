// Create Objects
const
header = new Nav("header"),
nav = new Nav("nav"),
main = new Element("main"),
aside = new Element("aside"),
footer = new Nav("footer");

// Add nodes to the body element.
header.init(document.body);
nav.init(document.body);
main.init(document.body);
aside.init(document.body);
footer.init(document.body);

// Set objects inner html?
header.set([["/loginsystem/index.php","Login"],["/loginsystem/index.php","Signup"]]);
nav.set([["/","Home"],["#","Community"]]);
footer.add(["https://github.com/damiantoczek/frontend", "Github"]);

main.add([ ["h1","Hello World!"],["p","This frontend is made with javascript."] ]);
