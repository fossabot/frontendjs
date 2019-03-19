// OPTION A
class Element {
  // The constructor creates and saves the node for other functions.
  constructor(array){
    this.node = create(array);
  }
}

// "r" render. When using myElement.r(); the node will be added to the body element as default.
// You can also choose a different node. myElement.r( otherNodeVar );
Element.prototype.r = function(node = document.body){
  node.appendChild( this.node );
}

// Add nodes to the parent node (this.node).
Element.prototype.add = function(array){
  // Create a node and store it as "nodes".
  // If multiple nodes where added: nodes = array
  // If a single node was added: nodes = object
  let nodes = create(array);
  // If nodes (multi) is of type array, loop the array of nodes into the parent node.
  if( nodes instanceof Array ) for(let node of nodes) this.node.appendChild(node);
  // If nodes (single) is of type object, add it to the parent node.
  else this.node.appendChild(nodes);
}

// Removes all child nodes.
Element.prototype.clear = function(){
  while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
}

// Deletes all child nodes and adds a node.
Element.prototype.set = function(array){
  this.clear();
  this.add(array);
}

// Hide a node element.
Element.prototype.hide = function(){
  // Get display style of this element.
  let display = this.node.style.display;
  // Check if the node is already hidden, if yes, log a warning and end the function.
  if( display == "none" ){
    console.warn( `${this.node.tagName} is already hidden.` );
    return;
  }
  // If the style display is not empty, store the elements display property.
  // cssDisplay will be used in the .show() method.
  if( display != "" ) this.cssDisplay = display;
  // Set display property to none.
  this.node.style = "display:none";
}

// Show a hidden node.
Element.prototype.show = function(){
  // Get display style of this element.
  let display = this.node.style.display;
  // Check if the node is already visible, if yes, log a warning and end the function.
  if( display !== "none"){
    console.warn( `${this.node.tagName} is already visible.` );
    return;
  }

  // Set the previous display property.
  this.node.style = `display:${this.cssDisplay}`;
  // Delete the cssDisplay property.
  delete this.cssDisplay;
}
