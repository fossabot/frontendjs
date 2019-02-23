class Nav {
  constructor(tag){
    this.tag = tag;
    this.node = create([this.tag]);
  }
  init(node){
    node.appendChild( this.node );
    this.element = document.getElementsByTagName(this.tag)[0];
  }
  add(x){
    /* Check if the second value is an array.
    * true = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * false = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( x[1] instanceof Array ){
      let o = [],
          i = 0;
      x.loop(function(p){
        // Push all created objects into an array.
        o.push( create(["a", { href:p[0] }, p[1]]) );
      });
      let l = x.length;
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
    this.node = create([this.tag]);
  }
  init(node){
    node.appendChild( this.node );
    this.element = document.getElementsByTagName(this.tag)[0];
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
  // Use example:
  // const signupForm = new Form({id:"signup", action: "index.php", method: "POST"});
  constructor(attr){
    if(attr.id) this.id = attr.id;
    // Create the main "init" node.
    this.node = create(["form", attr]);
  }
  init(node){
    node.appendChild( this.node );
    // Set the node param.
    if(this.id) this.element = document.getElementById(this.id);
  }
  add(x){
    // Example of use:
    // Multiple -> signupForm.add([["username"],["password"]]);
    // Single -> signupForm.add(["username"]);
    const inputType = function(x){
      // let attr be the default attributes.
      let attr = { id:x, name:x, placeholder:x};
      // Check if there is any valid input type for this input field.
      if(x == "username" || x == "password" || x == "email") attr = { id:x, type:x, name:x, placeholder:x};
      return attr;
    }
    let o = [], // let o be the output array.
        i = 0; // let i be the index counter.

    if( x[1] instanceof Array ){ // Check if the second value is an array.
      // Create the nodes and push them into the output array.
      x.loop(function(p){
        // Push the label into the output array.
        o.push( create(["label", { for:p[0] }, p[0]])  );
        o.push( create(["input", inputType(p[0]), p[0]])  );
      });
    }else{
      // Push the label into the output array.
      o.push( create(["label", { for:p[0] }, p[0]])  );
      o.push( create(["input", inputType(p[0]), p[0]])  );
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
