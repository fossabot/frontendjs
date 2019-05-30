"use strict";

// Is array?
function isArray(x){ return x instanceof Array; }

// Is string?
function isString(x){ return typeof x === 'string'; }

// Is string?
function isObject(x){ return typeof x === 'object'; }

// Create node elements.
function create( array ){

  let node; // Let node be the parent element node.

  // Handling multidimensional arrays like:
  // [["div", "My Div."], ["p", "My paragraph."]];
  if( isArray(array[0]) ){ // If the first value is an array...

    node = []; // make node an array...
    for( let arrayObj of array ) node.push( create(arrayObj) ); // Loop thru the array, get the values that are array and loop them into the node variable.
    return node; // Return an array of created node elements.
    // Info: Needs a loop to be appended:
    // myNodes.forEach(function(node){ document.body.appendChild(node); });
  }

  // Handle normal arrays like:
  // ["div", "my Div"];
  for( let value of array){ // Loop thru the single array and get all the values like string, objects and arrays.

    // If value is a string and node is undefined, create a node element.
    // Else if the value is a string, append a textnode to the parent node.
    if( isString( value ) && node == null ) node = document.createElement( value ); // If the value is a sting and the node variable isn't set, create a element with that value (string).
    else if( isString( value )) node.appendChild( document.createTextNode( value ) ); // else if, the value is a string and the node variable has been set, create a text node and append it to the parent node.

    // If the value is a object, it's a list of attributes, add those attributes to the created element node.
    if( isObject( value )) for( let attr in value )  node[attr] = value[attr]; // If the value is an object, loop thru the object and add the key:value pairs as attributes to the node element. (object)

    if( isArray( value )) node.appendChild( create(value) ); // If the value is an array, append the created node to the parent node. (array)
  }

  // Return a node element.
  return node;
}

/*
####################
###     CLASS    ###
####################
*/

class Node{
  constructor( array ){
    this.node = create( array );
  }
}

class Form extends Node{
  constructor( attr ){
    super(["form" , attr ]);
  }
}

class Img{
  constructor( path ){
    this.src = path;
    this.node = create(["img", { src: this.src } ]);
  }
}

class Slideshow extends Node{
  constructor( images, config ){
    super(["slideshow"]);
    this.images = []; // Stores an array of image file paths (strings).
    for( let src of images ) this.images.push( config.folder + src );

    this.index = 0; // Stores the current shown image from this.images.

    // Create the first image and store it to later change the src of this image.
    this.img = new Img();

    // if config.controls is false, show only image.
    if( config.controls === false ) this.node.appendChild( this.img.node );
    // if config.controls is true, show "go back, go next" buttonns.
    else {
      // Create prev button to go back one picture.
      this.buttonPrev = create(["button", "<"]);
      this.buttonPrev.addEventListener("click", () => {
        this.prev();
      });

      // Create next button to go next picture.
      this.buttonNext = create(["button", ">"]);
      this.buttonNext.addEventListener("click", () => {
        this.next();
      });

      // Append buttons.
      this.node.appendChild( this.buttonPrev );
      this.node.appendChild( this.img.node );
      this.node.appendChild( this.buttonNext );

    }

    this.load( config.folder );

  }
}

/*
####################
### NODE METHODS ###
####################
*/

// initialize the created element instance. (In other words, render it into the view.)
// To initialize the created node element into another element instance:
// mainNode.init( myDiv.node );
Node.prototype.init = function( node = document.body ){
  node.appendChild( this.node );
}

// Removes all child nodes.
Node.prototype.clear = function(){
  while (this.node.lastChild) this.node.removeChild(this.node.lastChild);
}

// Set the text of a node element.
// Use when there is already a text defined. If there is no text node, use the .text(); method. setText uses the clear(); method that checks and deletes existing child nodes.
Node.prototype.setText = function( string ){
  this.clear();
  this.node.appendChild( document.createTextNode(string) );
}

// Insert text to a element.
Node.prototype.text = function( string ){
  this.node.appendChild( document.createTextNode(string) );
}

// Deletes all child nodes and adds a node.
Node.prototype.set = function( array ){
  this.clear();
  this.add(array);
}

// Add nodes to the parent node (this.node).
Node.prototype.add = function( array ){
  let nodes = create(array); // look frontend.js for more info.
  // If nodes (multi) is of type array, loop the array of nodes into the parent node.
  if( isArray(nodes) ) for(let node of nodes) this.node.appendChild(node);
  // If nodes (single) is of type object, add it to the parent node.
  else this.node.appendChild(nodes);
}

// Hide a node element.
Node.prototype.hide = function(){
  // Get display style of this node element.
  let display = this.node.style.display;
  // If the display attribute is not empty, store the elements display property in cssDisplay property.
  // cssDisplay will be used in the .show() method.
  if( display != "" && display != this.cssDisplay ) this.cssDisplay = display;
  // Set display property to none (hide it)
  this.node.style = "display:none";
}

// Show a hidden node.
Node.prototype.show = function(){
  // Get display style of this element.
  let display = this.node.style.display;
  // Set the previous display property.
  if( display == "none" ) this.node.style = `display:${this.cssDisplay}`;
}

// Add css to a element.
Node.prototype.css = function( string ){
  this.node.style = string;
}

// Get the child nodes of a element.
Node.prototype.getNodes = function( string ){
  return this.node.childNodes;
}

// Finds node elements with the specified tag.
// Returns an array of node elements.
Node.prototype.findNode = function( string ){
  let nodes = this.node.childNodes,
      found = [];

  for( let node of nodes ) if( node.nodeName === string ) found.push(node);

  return found;
}

// add event listeners to an element instance.
Node.prototype.on = function( method, func ){
  this.node.addEventListener( method, function(){ func(); });
}

// Toggle functions
/* Example
var testBtn = new Element(["button", "Light"]);
testBtn.init(main.node)

testBtn.toggle(
  function(){ console.log("a"); },
  function(){ console.log("b"); }
);
*/
Node.prototype.toggle = function( a, b ){
  this.node.addEventListener( "click", function(){
    if( this.toggle == false ){
      this.toggle = true;
      b();
    }
    else{
      this.toggle = false;
      a();
    }
  });
}

/*
####################
### FORM METHODS ###
####################
*/

// Adds a submit event listener to a form.
/* Example:
  login.submit( function(){
      console.log("Your form has been submitted.");
  });
*/
Form.prototype.submit = function( callback ){
  this.node.addEventListener("submit", (e) => {
    e.preventDefault();
    callback();
  });
}

/*
#########################
### Slideshow METHODS ###
#########################
*/

Slideshow.prototype.load = function(){
  // Load image based on "this.index" number
  this.img.node.src = this.images[ this.index ];
}

Slideshow.prototype.next = function(){
  // Load the next number in index.
  if( this.index < this.images.length - 1){
    this.index = this.index + 1;
    this.load();
  }
}

Slideshow.prototype.prev = function(){
  // Load the previous number in index.
  if( this.index !== 0 ){
    this.index = this.index - 1;
    this.load();
  }
}

/*
###################
### IMG METHODS ###
###################
*/



// add event listeners on all elements inside the array. Made to use with "findNode("string")" method.
/*
var nav = new Element(["nav"]);
nav.init();
nav.add( [ ["a"],["a"] ] );

nav.findNode("A").onAll("click", function(){
  console.log("CLICKED");
});
*/

Array.prototype.onAll = function( method, func ){
  for( let value of this ) value.addEventListener( method, function(){ func(); });
}
