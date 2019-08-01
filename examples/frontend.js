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
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      func(JSON.parse(this.responseText));
    }
  };

  req.open(method, path, true);
  req.send();
}

function createNode (array){
  // If array is string, return a simple nodeElement.
  if(typeof array === "string") return document.createElement(array);

	// Create a parent node element.
	var node = document.createElement(array[0]);

	// If array[1] is an string, add x as text to the parent node element.
	if(typeof array[1] === "string") node.textContent = array[1];
	// if array[1] is an array, call createNode and append it to the parent node element.
	if(array[1] instanceof Array) node.appendChild(createNode(array[1]));
	// if array[1] is not an array but is a object, add key:values as attributes to the parent node element.
	else if(typeof array[1] === "object"){
		var key = Object.keys(array[1]),
			value = Object.values(array[1]);

		var i = 0, l = key.length;
		for(; i < l; i++) node[key[i]] = value[i];
	}

	// array[2]
	// If array[2] is an string, add x as text to the parent node element.
	if(typeof array[2] === "string") node.textContent = array[2];
	// if array[2] is an array, call createNode and append it to the parent node element.
	if(array[2] instanceof Array) node.appendChild(createNode(array[2]));

	// array[3]+
	// If array[4] exists, create a loop that will create nodes and append them to the parent node element.
	if(array[4] != null){
		var i = 0, l = array.length;
		for(; i < l; i++) node.appendChild(createNode(array[i]));
	}
	// if array[3] is an array, call createNode and append it to the parent node element.
	else if(array[3] instanceof Array) node.appendChild(createNode(array[3]));

	return node;
}

class Node {
  constructor (array){
    this.node = createNode(array);
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
    this.node.appendChild(createNode(array));
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
    while(this.node.lastChild) this.node.removeChild(this.node.lastChild);
  }
}

class Form {
  constructor (attr){
    this.node = createNode(["form", attr]);
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
  constructor (attr = {}){
    if(attr.search){
      // Create a input node for the search.
      this.input = createNode(["input", {placeholder:"Search..."}]);
      this.input.oninput = ()=>{
        var tbody = this.tbody.node;
        // Create an array of keywords spaced by space and remove "empty spaces" from the array.
        var keyword = this.input.value.split(" ").filter(value => value != "");
        // Get all rows<tr> from tbody.
        var row = tbody.childNodes;

        for(var i = 0; i < row.length; i++){
          var cell = row[i].childNodes; // All <td> elements.
          var textString = ""; // String that will contain all the text from the cells.

          var j = 0; // Let j be the index for all inner-loops.
          for(; j < cell.length; j++) textString += cell[j].textContent; // Loop everything into one long string.
          textString = textString.toLowerCase(); // Make the whole string lowercase.
          textString = textString.replace(/\s/g,""); // Remove all whitespaces.

          var foundKeywords = []; // Store all found keywords.
          for(j = 0; j < keyword.length; j++){
            var regex = new RegExp(keyword[j].toLowerCase());
            // If the keyword was found in the textString then push the keyword into the foundKeywords.
            if(regex.test(textString)) foundKeywords.pushUnique(keyword[j]);
          }

          // Handle the matching and not matching results.
          if(foundKeywords.length === keyword.length){
            row[i].classList.remove("nomatch");
          }else row[i].className = "nomatch";
        }
      };
    }

    this.node = createNode(["table", attr]);
    this.thead = new TableSection("thead");
    this.tbody = new TableSection("tbody");

    // Append nodes to the table element.
    this.node.appendChild(this.thead.node);
    this.node.appendChild(this.tbody.node);
  }

  // Swap the text in existing rows.
  // Will be used later for "pages".
  swap (array){
    var tbody = this.tbody.node;
    var row = tbody.childNodes;
    var cell;

    for(var i = 0; i < array.length; i++){
      cell = row[i].childNodes;
      for(var j = 0; j < array[i].length; j++) cell[j].textContent = array[i][j];
    }

    var deleteCount = row.length - array.length;    
    while(deleteCount--) tbody.removeChild(tbody.lastChild);
  }

  init (targetNode = document.body){
    if(this.input) targetNode.appendChild(this.input);
    targetNode.appendChild(this.node);
  }

  dump (data){
    this.thead.add(Object.keys(data[0]));
    for(var i = 0; i < data.length; i++) this.tbody.add(Object.values(data[i]));
  }
}

class TableSection {
  constructor(string){
    this.node = document.createElement(string);
  }

  // Add created nodes.
  add (array){
    // If the parent is "TBODY" create a row with cells.
    if(this.node.tagName === "TBODY"){
      var row = document.createElement("tr");

      for(var i = 0, l = array.length; i < l; i++){
        var cell = document.createElement("td");
        cell.textContent = array[i];
        row.appendChild(cell);
      }

      this.node.appendChild(row);
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
}
