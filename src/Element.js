class Element extends Node {
  constructor (array){
    super(array);
  }

  // Add created nodes.
  add (array){
    this.node.appendChild(createElement(array));
  }

  // Clear the node before adding nodes.
  set (array){
    this.clear();
    this.add(array);
  }

  // Add a text node to this.node.
  text (string){
    this.node.appendChild(document.createTextNode(string));
  }

  // Clear this.node before adding a text node.
  setText (string){
    this.clear();
    this.text(string);
  }

  // Removes all child nodes from within the parent (this.node) element.
  clear (){
    while(this.node.lastChild){
      this.node.removeChild(this.node.lastChild);
    }
  }
}
  