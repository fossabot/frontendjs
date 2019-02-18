class Nav {
  constructor(tag){
    this.tag = tag;
  }
  init(node){
    node.appendChild(create([this.tag]));
    this.node = document.getElementsByTagName(this.tag)[0];
  }
  add(x){
    let o = [];
    x.loop(function(p){
      let node = create(["a", {href:p[0]}, p[1]]);
      o.push(node);
    });
    for(let i = 0; i<o.length; i++ ) this.node.appendChild(o[i]);
  }
  set(x){
    let o = x;
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(o);
  }
}

class Element {
  constructor(tag){
    this.tag = tag;
  }
  init(node){
    node.appendChild(create([this.tag]));
    this.node = document.getElementsByTagName(this.tag)[0];
  }
  add(x){
    let o = [];
    x.loop(function(p){
      let node = create(["a", {href:p[0]}, p[1]]);
      o.push(node);
    });
    for(let i = 0; i<o.length; i++ ) this.node.appendChild(o[i]);
  }
  set(x){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.node.appendChild(create(x));
  }
}

window.onload = function(){
  // Header Object
  const header = new Nav("header");

  // Nav Object
  const nav = new Nav("nav");

  // Main Object
  const main = new Element("main");

  // Aside Object
  const aside = new Element("aside");

  // Footer Object
  const footer = new Element("footer");

  // INIT();
  header.init(document.body);
  nav.init(document.body);
  main.init(document.body);
  aside.init(document.body);
  footer.init(document.body);

  // SET
  header.set([["#","Login"],["#","Signup"]]);
  nav.set([["#","Home"],["#","Community"]]);

  // TEST

  main.set(["a", {href: "#", id: "btn"}, "click or die"]);
  var test = document.getElementById("btn");
  test.addEventListener("click",function(){
    header.add([["#","potato"],["#","LUL"]]);
  });

}// onload END
