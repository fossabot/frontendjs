// Check if it's an array.
function isArray(x){
  return x instanceof Array;
}

// Create a JS element.
// create(["a", { href: "#"}, "myLink"]);
function create(x){
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
header = new Nav(["header"]),
nav = new Nav(["nav"]),
main = new Element(["main"]),
aside = new Element(["aside"]),
footer = new Nav(["footer"]);

// Add nodes to the body element.
header.init(document.body);
nav.init(document.body);
main.init(document.body);
aside.init(document.body);
footer.init(document.body);

// Set objects inner html?
header.set([["/loginsystem/","Login"],["/loginsystem/","Signup"]]);
nav.set([["/","Home"],["#","Community"]]);
footer.add(["https://github.com/damiantoczek/frontend", "Github"]);
