// Create a JS element.
// create(["a", { href: "#"}, "myLink"]);
function create(x){
  const isArray = (x) => x instanceof Array;
  let element = x[0],
      child = x[1],
      node = document.createElement(element),
      i = 1;

  if (typeof child === "object" && child !== null && !isArray(child)){
    for (let attr in child) node[attr] = child[attr];
    i = 2;
  }

  let l = x.length;
  for (; i < l; i++){
    if( isArray(x[i]) ) node.appendChild( create(x[i]) );
    else node.appendChild( document.createTextNode(x[i]) );
  }

  return node;
}

// Create Objects
const
header = new Element(["header"]),
nav = new Nav(["nav"]);
main = new Element(["main"]),
aside = new Element(["aside"]),
footer = new Element(["footer"]);

// Add nodes to the body element.
header.init(document.body);
nav.init(document.body);
main.init(document.body);
aside.init(document.body);
footer.init(document.body);

// Set objects inner html?
header.add([ ["span", { id: "pageName" }, "frontendjs"], ["span", { id: "pageDomain" }, ".org"] ]);
nav.add([ ["/","Home"], ["https://github.com/damiantoczek/frontendjs","Github"], ["/docs","Docs"] ]);
footer.add(["pre", "git clone https://github.com/damiantoczek/frontendjs.git"]);
