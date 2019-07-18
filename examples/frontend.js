"use strict";
Array.prototype.remove = function(value){
  var index = this.indexOf(value);
  this.splice(index,1);
};
Array.prototype.pushUnique = function(value){
  var result = this.indexOf(value);
  if(result === -1) this.push(value);
};
function ajax (method, path, func){
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      func(JSON.parse(this.responseText));
    }
  };

  req.open(method, path, true);
  req.send();
}
function createNode (array){
  // If array is a string, return a simple element.
  if(typeof array === "string") return document.createElement(array);

  // If array is an array and the first value of string.
  // Create an element with optional attributes or text nodes.
  if(typeof array[0] === "string"){
    var node = document.createElement(array[0]);
    for(var i = 1; i < array.length; i++){
      if(array[i] instanceof Array){
        node.appendChild(createNode(array[i]));
        continue;
      }
      if(typeof array[i] === "string"){
        node.appendChild(document.createTextNode(array[i]));
        continue;
      }

      if(typeof array[i] === "number"){
        node.appendChild(document.createTextNode(array[i].toString()));
        continue;
      }

      if(typeof array[i] === "object"){
        var keys = Object.keys(array[i]);
        var value = Object.values(array[i]);
        for(var j = 0; j < keys.length; j++) node[keys[j]] = value[j];
      }
    }
    return node;
  }

  // If array is an array and the first value is an array.
  // Loop thru the array to create multiple elements.
  var node = [];
  for(var i = 0; i < array.length; i++) node.push(createNode(array[i]));
  return node;
}

class Base {
  // Append this element to the targetNode.
  init (targetNode = document.body){
    targetNode.appendChild(this.node);
  }

  // Append this element to a node.
  initNode (nodeName){
    nodeName.node.appendChild(this.node);
  }

  // Append this element to a id element.
  initId (idName){
    document.getElementById(idName).appendChild(this.node);
  }

  // Append this element to a tag element.
  initTag (tagName){
    document.getElementsByTagName(tagName)[0].appendChild(this.node);
  }

  on (method, func){
    this.node.addEventListener(method, function(){
      func();
    });
  }
}

class Node extends Base {
  constructor (array){
    super();
    this.node = createNode(array);
  }

  // Removes all child nodes from within the parent (this.node) element.
  clear (){
    while(this.node.lastChild) this.node.removeChild(this.node.lastChild);
  }

  removeClass (string){
    this.node.classList.remove(string);
  }
}

class Element extends Node {
  constructor (array){
    super(array);
  }

  // Add created nodes.
  add (array){
    var nodes = createNode(array);
    if(nodes instanceof Array) for(var i = 0; i < nodes.length; i++) this.node.appendChild(nodes[i]);
    else this.node.appendChild(nodes);
  }

  // Clear the node before adding nodes.
  set (array){
    this.clear();
    if(array[0] instanceof Array) this.add(array);
    return this.add(array);
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
}

class Form extends Node {
  constructor (attr){
    super(["form", attr]);
  }

  submit (callback){
    this.node.addEventListener("submit", e => {
      e.preventDefault();
      callback();
    });
  }
}

class Img {
  constructor (){
    this.node = document.createElement("img");
  }

  // Load/change the image source. (String)
  load (path){
    this.node.src = path;
  }
}

class Slideshow extends Node {
  constructor (images, config){
    /* config

      folder: string //path to the image folder.
      controls: boolean //show buttons, previous and next.
      thumbnails: boolean //show image thumbnails?
    */
    super("slideshow");
    this.images = images;
    this.config = config;
    this.index = 0;

    this.wrap = document.createElement("wrap");

    this.img = new Img();
    this.img.load(config.folder + this.images[0]); // Load the first image from the array as default.

    // If controls is set to true, create and show buttons.
    // else show only the image.
    this.controls(this.config.controls);

    this.node.appendChild(this.wrap);

    if(this.config.thumbnails) this.thumbnails();
  }

  thumbnails (){
    var thumbnails = document.createElement("thumbnails");

    for(var i = 0, l = this.images.length; i < l; i++){
      // create a thumbnail image element.
      let img = document.createElement("img");
      // add the index position inside the array of this image as a value.
      img.dataset.index = i;
      // add image src path to the thumbnail images.
      img.src = this.config.folder + this.images[i];
      // add a click event listener on all thumbnail images.
      img.addEventListener("click", () => {
        this.img.load(this.config.folder + this.images[ img.dataset.index ]); // load the thumbnail image inside the main image.
        this.index = parseInt(img.dataset.index); // set the slideshow index to the thumbnail index. Must be parsed as int.
      });
      // add images(thumbnails) to the thumbnail container.
      thumbnails.appendChild(img);
    }

    this.node.appendChild(thumbnails);
  }

  controls (boolean){
    if(!boolean){
      this.wrap.appendChild(this.img.node);
      return;
    }

    this.buttonPrevious = createNode(["button", "<"]);
    this.buttonPrevious.addEventListener("click", ()=>{
      this.previous();
    });

    this.buttonNext = createNode(["button", ">"]);
    this.buttonNext.addEventListener("click", ()=>{
      this.next();
    });

    this.wrap.appendChild(this.buttonPrevious);
    this.wrap.appendChild(this.img.node);
    this.wrap.appendChild(this.buttonNext);
  }

  next (){
    if(this.images.length-1 > this.index){
      this.img.load(this.config.folder + this.images[++this.index]);
    }
  }

  previous (){
    if(this.index > 0){
      this.img.load(this.config.folder + this.images[--this.index]);
    }
  }
}

class Table {
  constructor (attr){
    if(attr.search === true){
      this.input = createNode(["input", {placeholder:"Search..."}]);
      this.input.oninput = ()=>{
        // Run this code only if the input data is not "space" / "whitespace".
        var keyword = this.input.value.split(" ").filter(value => value != "");
        console.log(keyword);
      };
    }

    this.table = createNode(["table", attr]);
    this.thead = new TableSection("thead");
    this.tbody = new TableSection("tbody");

    // Append elements.
    this.thead.init(this.table);
    this.tbody.init(this.table);
  }

  init (targetNode = document.body){
    if(this.input != null) targetNode.appendChild(this.input);
    targetNode.appendChild(this.table);
  }

  clear (obj){
    while(obj.firstChild){
      obj.removeChild(obj.lastChild);
    }
  }
}

class TableSection extends Node {
  constructor(array){
    super(array);
  }

  createRow(){

  }

  // Add created nodes.
  add (array){
    // If the parent is "TBODY" create a row with cells.
    if(this.node.tagName === "TBODY"){
      var row = document.createElement("tr");

      for(var i = 0, l = array.length; i < l; i++){
        var cell = document.createElement("td");
        var text = document.createTextNode(array[i]);
        cell.appendChild(text);
        row.appendChild(cell);
        this.node.appendChild(row);
      }

      return;
    }

    // If the parent is "THEAD" append cells to the parent.
    for(var i = 0, l = array.length; i < l; i++){
      var cell = document.createElement("th");
      var text = document.createTextNode(array[i]);
      cell.appendChild(text);
      this.node.appendChild(cell);
    }
  }

  // Clear the node before adding nodes.
  set (array){
    this.clear();
    if(array[0] instanceof Array) this.add(array);
    return this.add(array);
  }
}
