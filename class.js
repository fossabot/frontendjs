// OPTION A
class Element {
  // The constructor creates and saves the node for other functions.
  constructor(array){
    this.node = create(array);
  }
}

// "r" stands for render. When using myElement.r(); the node will be added to the body element as default.
// You can also choose a different node. myElement.r( otherNodeVar );
Element.prototype.r = function(node = document.body){
  node.appendChild( this.node );
}

// Add nodes to the parent node (this.node).
Element.prototype.add = function(array){
  // Create a node and store it as "nodes"
  let nodes = create(array);
  // If nodes (multi) is of type array, loop the array of nodes into the parent node.
  if( nodes instanceof Array ) for(let node of nodes) this.node.appendChild(node);
  // If nodes (single) is of type object, add it to the parent node.
  else this.node.appendChild(nodes);
}
