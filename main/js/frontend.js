class Nav {
  constructor(tag){
    this.tag = tag;
  }
  init(node){
    node.appendChild( create([this.tag]) );
    this.node = document.getElementsByTagName(this.tag)[0];
  }
  add(x){
    /* Check if the second value is an array.
    * true = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * false = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( x[1] instanceof Array ){
      let o = [],
          i = 0,
          l = x.length;
      x.loop(function(p){
        // Push all created objects into an array.
        o.push( create(["a", {href:p[0]}, p[1]]) );
      });
      // Loop thru the array to add all nodes into the parent node.
      for(; i<l; i++ ) this.node.appendChild(o[i]);
    }else{
      // Add a single node to the parent.
      this.node.appendChild( create(["a", {href:x[0]}, x[1]]) );
    }
  }
  set(x){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(x);
  }
}

class Element {
  constructor(tag){
    this.tag = tag;
  }
  init(node){
    node.appendChild( create([this.tag]) );
    this.node = document.getElementsByTagName(this.tag)[0];
  }
  add(x){
    /* Check if the second value is an array.
    * true = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * false = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( x[1] instanceof Array ){
      let o = [],
          i = 0,
          l = x.length;
      x.loop(function(p){
        // Push all created objects into an array.
        o.push( create(p) );
      });
      // Loop thru the array to add all nodes into the parent node.
      for(; i<l; i++ ) this.node.appendChild(o[i]);
    }else{
      // Add a single node to the parent.
      this.node.appendChild( create(x) );
    }
  }
  set(x){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(x);
  }
}

window.onload = function(){
  // Header Object
  const header = new Nav("header"),
        nav = new Nav("nav"),
        main = new Element("main"),
        aside = new Element("aside"),
        footer = new Element("footer");
  // INIT(); Add nodes to the body element.
  header.init(document.body);
  nav.init(document.body);
  main.init(document.body);
  aside.init(document.body);
  footer.init(document.body);

  // SET
  header.set([["#","Login"],["#","Signup"]]);
  nav.set([["#","Home"],["#","Community"]]);

  //main.set([["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]);
  main.set([["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]);

  var testadd = document.getElementById("testadd");
  var testset = document.getElementById("testset");
  testadd.addEventListener("click",function(){
    nav.add(["#","Home"]);
  });
  testset.addEventListener("click",function(){
    nav.set([["#","hi"],["#","bye"]]);
  });

}// onload END
