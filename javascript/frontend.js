"use strict";

Array.prototype.remove = function(element){
  var index = this.indexOf(element);
  this.splice(index,1);
}

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
  var node;
  if(typeof array[0] == "string"){
    node = document.createElement(array[0]);
    for(var i = 1; i < array.length; i++){
      if(array[i] instanceof Array){
        node.appendChild(createNode(array[i]));
        continue;
      }
      if(typeof array[i] === "string"){
        node.appendChild(document.createTextNode(array[i]));
        continue;
      }
      if(typeof array[i] === "object"){
        var keys = Object.keys(array[i]);
        var value = Object.values(array[i]);
        for(var j = 0; j < keys.length; j++) node[keys[j]] = value[j];
        continue;
      }
    }
    return node;
  }

  node = [];
  for(var i = 0; i < array.length; i++) node.push(createNode(array[i]));
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

  // Removes all child nodes from within the parent (this.node) element.
  clear (){
    while(this.node.lastChild) this.node.removeChild(this.node.lastChild);
  }

  removeClass (string){
    this.node.classList.remove(string);
  }

  on (method, func){
    this.node.addEventListener(method, function(){
      func();
    });
  }
}

class Element extends Node {
  constructor (array){
    super(array);
  }

  add (array){
    var nodes = createNode(array);
    if(nodes instanceof Array) for(var i = 0; i < nodes.length; i++) this.node.appendChild(nodes[i]);
    else this.node.appendChild(nodes);
  }

  // Clear the node before adding nodes.
  set (array){
    this.clear();
    if(array[0] instanceof Array) this.addM(array);
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

class Form extends Element {
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

  // Append this element to the targetNode.
  init (targetNode = document.body){
    targetNode.appendChild(this.node);
  }

  // Load/change the image source. (String)
  load (path){
    this.node.src = path;
  }
}

class Slideshow extends Node {
  constructor (images, config){
    super(["slideshow"]);
    this.images = images; // store images so other methods have access to them.
    this.config = config; // store config ^
    this.index = 0; // keep track of the image that is showing.
    this.img = new Img(); // create a empty image node.
    this.img.load(config.folder + this.images[0]); // load the first image as default.

    // MAIN image container .ssmain
    this.wrap = document.createElement("div");
    this.wrap.className = "ssmain";
    this.prevButton = createNode(["button", "<"]);
    this.nextButton = createNode(["button", ">"]);

    // show the next picture when "nextButton" is clicked.
    this.nextButton.addEventListener("click", () => {
      this.next();
    });

    // show the previous picture when "prevButton" is clicked.
    this.prevButton.addEventListener("click", () => {
      this.prev();
    });

    // append nodes together.
    this.wrap.appendChild(this.prevButton);
    this.wrap.appendChild(this.img.node);
    this.wrap.appendChild(this.nextButton);

    // THUMBNAILS .ssthumbnails
    this.thumbnails = document.createElement("div");
    this.thumbnails.className = "ssthumbnails";

    // loop thru the image array to create thumbnails.
    for(let i = 0; i < this.images.length; i++){
      // create a thumbnail image element.
      let img = document.createElement("img");

      // add the index position inside the array of this image as a value.
      img.dataset.index = i;

      // add image src path to the thumbnail images.
      img.src = this.config.folder + this.images[i];

      // add a click event listener on all thumbnail images.
      img.addEventListener("click", () => {
        let index = img.dataset.index; // let index be the dataset index of thumbnail images.
        this.img.load(this.config.folder + this.images[ index ]); // load the thumbnail image inside the main image.
        this.index = parseInt(index); // set the slideshow index to the thumbnail index. Must be parsed as int.
      });

      // add images(thumbnails) to the thumbnail container.
      this.thumbnails.appendChild(img);
    }

    // append nodes together.
    this.node.appendChild(this.wrap);
    this.node.appendChild(this.thumbnails);
  }

  next (){
    if(this.index < this.images.length - 1){
      this.index = this.index + 1;
      this.img.load(this.config.folder + this.images[ this.index ]);
    }
  }

  prev (){
    if(this.index !== 0){
      this.index = this.index - 1;
      this.img.load(this.config.folder + this.images[ this.index ]);
    }
  }
}

class Table {
  constructor (attr){
    this.node = createNode(["table", attr]);
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");
    this.node.appendChild(this.thead);
    this.node.appendChild(this.tbody);
  }

  init (targetNode = document.body){
    targetNode.appendChild(this.node);
  }

  theadAddRow (array){
    this.thead.appendChild( this.createRow("th", array) );
  }

  tbodyAddRow (array){
    this.tbody.appendChild( this.createRow("td", array) );
  }

  createRow (tag, array){
    var tr = document.createElement("tr");
    var td, textNode;
    for(var i = 0; i < array.length; i++){
      td = document.createElement(tag);
      textNode = document.createTextNode(array[i]);
      td.appendChild(textNode);
      tr.appendChild(td);
    }
    return tr;
  }
}

class Search extends Node {
  constructor (attr){
    super(["input", attr]);
    this.in = attr.in; // Let "in" be the target where the search will happen.

    this.findCell = function(row, keyword){
      var foundKeywords = [];
      var cell = row.children;

      // Loop thru each cell <td>
      for(var i = 0; i < cell.length; i++){
        var text = cell[i].textContent;
        // Loop each keyword and compare it to the cell text with a regexp.

        //if(keyword.length < 1) break;
        for(var j = 0; j < keyword.length; j++){
          var regex = new RegExp(keyword[j], "i");
          if(regex.test(text)){
            foundKeywords.push(keyword[j]);
          }
        }
      }

      if(foundKeywords.length > 0) return foundKeywords;
      return false;
    };

    this.node.oninput = ()=>{
      // Let tbody be the content to search in.
      var tbody = document.getElementById(this.in).getElementsByTagName("tbody")[0];
      // Let tr be the collection of all tr elements.
      var tr = tbody.getElementsByTagName("tr");
      // Let keywords be an array of keywords to search for.
      // filter() removes all whitespaces and empty strings.
      var keyword = this.node.value.split(" ").filter(value => value != "");
      // Store all found rows in foundRows.
      var foundRows = [];
      // Loop thru each row <tr>
      for(var i = 0; i < tr.length; i++){
        var row = tr[i];
        // Make each row opaque (makes more sense in the next loop)
        row.className = "opaque";
        // Let result be the return of the findCell function. It returns false or an array of found keywords.
        var result = this.findCell(row, keyword);
        // If returned keywords match the searched keywords
        // push the row to the foundRows array.
        if(result.length >= keyword.length) foundRows.push(row);
      }

      // Loop thru all foundRows and "highlight" them in some way.
      for(i = 0; i < foundRows.length; i++){
        // Remove the class("opaque") from the found row that matched our search.
        foundRows[i].className = "";
        // Move the found row to the top of tbody.
        tbody.insertBefore(foundRows[i], tbody.firstChild);
      }
    };
  }
}
