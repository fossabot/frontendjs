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
        o.push( create(["a", { href:p[0] }, p[1]]) );
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
    /* Use example:
    * Multiple (true) = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * Single (false) = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( x[1] instanceof Array ){
      let o = [],
          i = 0;

      x.loop(function(p){
        // Push all created objects into the output array.
        o.push( create(p) );
      });

      let l = o.length; // let l be the array length.
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

class Form {
  constructor(id){
    this.id = id;
  }
  init(node){
    // Create the main "init" node.
    node.appendChild( create(["form", { id:this.id }]) );
    // Set the node param.
    this.node = document.getElementById(this.id);
  }
  add(x){
    // Example of use:
    // Multiple -> signupForm.add([["username"],["password"]]);
    // Single -> signupForm.add(["username"]);
    let o = [], // let o be the output array.
        i = 0; // let i be the index counter.

    if( x[1] instanceof Array ){ // Check if the second value is an array.
      // Create the nodes and push them into the output array.
      x.loop(function(p){
        o.push( create(["label", { for:p[0] }, p[0]])  );
        o.push( create(["input", { id:p[0], name:p[0], placeholder:p[0]}, p[0]])  );
      });
    }else{
      o.push( create(["label", { for:x[0] }, x[0]])  );
      o.push( create(["input", { id:x[0], name:x[0], placeholder:x[0]}, x[0]])  );
    }

    // Create a submit button.
    o.push( create(["input", { type:"submit", value:"submit"}]) );

    let l = o.length; // Let l be the length of the output array.
    // Append all nodes to "this.node" from the output array.
    for(; i<l; i++){
      this.node.appendChild(o[i]);
    }
  }
  set(x){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(x);
  }
}
