class Node {
  constructor (array){
    this.node = createElement(array);
  }

  // Append this element to the targetNode.
  init (targetNode = document.body){
    targetNode.appendChild(this.node);
  }

  on (method, func){
    this.node.addEventListener(method, function(){
      func();
    });
  }

  addClass (string){
    this.node.classList.add(string);
  }

  removeClass (string){
    this.node.classList.remove(string);
  }
}
  