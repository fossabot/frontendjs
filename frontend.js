// id("myTitle").textContent = "Hello World";
function id(id){ return document.getElementById(id); }

// e("p")[0].textContent = "Hello World";
function e(tag){ return document.getElementsByTagName(tag); }

// Is array?
function isArray(obj){
  return obj instanceof Array;
}

// Is string?
function isString(obj){
  return typeof obj === 'string';
}

// Create a element node.
// ["div", { className:"infoBox" }, "This is a textNode inside the div."];
function createNode(array){

  let
  // get second array element.
  child = array[1],
  // set the loop index to 1.
  i = 1,
  // create a node out of first array element.
  // Array[0] is the tagname.
  node = document.createElement( array[0] );

  // If child is an object, not an array, create attributes.
  if (typeof child === "object" && child !== null && !isArray(child)){

    // Child parameter is a object that contains the attributes.
    // document.createElement(tagName, [options]);
    // Options are the attributes defined in the child key:value object.
    for (let attr in child) node[attr] = child[attr];

    // Set the loop index to 2.
    i = 2;
  }

  // Get the array length.
  let l = array.length;

  // Loop the array.
  for (; i < l; i++){
    console.log( array[i] );

    // If "array[i]" is an array: append it do the parent node.
    // create(["parent", { className:"Attributes" }, ["Second_Element_Inside_parent", "Text Node"]]);
    if( isArray(array[i]) ){

      // Create a child node. create(array[i])
      // Append it to the parent node. node.appendChild(...);
      node.appendChild( create(array[i]) );

    }else

      // If it's not a array or object, create a text node. document.createTextNode(array[i])
      // Append the textNode to the parent node. node.appendChild(...);
      node.appendChild( document.createTextNode(array[i]) );
  }

  return node;
}

// Creating basic elements.
class Element {
  constructor(array){
    // Create the main "r" node.
    this.node = create(array);
  }
  r(node){
    node.appendChild( this.node );
    this.element = e(this.tag)[0];
  }
  add(array){
    /* Use example:
    * Multiple (true) = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * Single (false) = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( array[1] instanceof Array ){
      let o = [],
          i = 0;

      array.forEach(function(p){
        // Push all created objects into the output array.
        o.push( create(p) );
      });

      let l = o.length; // let l be the array length.
      // Loop thru the array to add all nodes into the parent node.
      for(; i<l; i++ ) this.node.appendChild(o[i]);
    }else{
      // Add a single node to the parent.
      this.node.appendChild( create(array) );
    }
  }
  set(array){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(array);
  }
}

class Nav {
  constructor(array){
    this.node = create(array);
  }
  r(node){
    node.appendChild( this.node );
    this.element = document.getElementsByTagName(this.tag)[0];
  }
  add(array){
    /* Check if the second value is an array.
    * true = [["a", {href:"#", id:"testadd"}, "add"],["a", {href:"#", id:"testset"}, "set"]]
    * false = ["a", {href:"#", id:"testadd"}, "add"]
    */
    if( array[1] instanceof Array ){
      let o = [],
          i = 0;
      array.forEach(function(p){
        // Push all created objects into an array.
        o.push( create(["a", { id:p[0] }, p[1]]) );
      });
      let l = array.length;
      // Loop thru the array to add all nodes into the parent node.
      for(; i<l; i++ ) this.node.appendChild(o[i]);
    }else{
      // Add a single node to the parent.
      this.node.appendChild( create(["a", {href:array[0]}, array[1]]) );
    }
  }
  set(array){
    while( this.node.lastChild ) this.node.removeChild(this.node.lastChild);
    this.add(array);
  }
}

class Form { // const signupForm = new Form({id:"signup", action: "index.php", method: "POST"});
  constructor(attr){
    if(attr.id) this.id = attr.id;
    // Create the main "r" node.
    this.node = create(["form", attr]);
  }
  r(node){
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
      if(x == "username" || x == "password" || x == "email") attr.type = x;
      return attr;
    }
    let o = [], // let o be the output array.
        i = 0; // let i be the index counter.

    if( x[1] instanceof Array ){ // Check if the second value is an array.
      // Create the nodes and push them into the output array.
      x.forEach(function(p){
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

// PROTOTYPE

function create(array,target = document.body ){

  // Check if a single element is created.
  // True = ["div", { className:"demo" }, ["p","my paragraph inside the div."]];
  // False = [ ["div", "first"], ["div", "second"] ];
  if( isString(array[0]) ){

    // Add the created element into the target element.
    // By default it's the body element.
    target.appendChild( createNode(array) );

  } else {
    // Let output store all created element nodes.
    let output = [];

    // Create and add all elements to the output array.
    array.forEach(function(x){
      output.push( createNode(x) );
    });

    // Loop all elements into the target element.
    // By default it's the body element.
    output.forEach(function(x){
      target.appendChild( x );
    });
  }

}
let elem = ["code", ["pre", "console.log('Hello World!');"], ["pre", "Hello"]];
let multi = [["p","Hello "],["p", "World!" ]];
let testNode = create( elem );
