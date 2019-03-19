"use strict";
// Is array?
function isArray(x){ return x instanceof Array; }

// Is string?
function isString(x){ return typeof x === 'string'; }

// Is string?
function isObject(x){ return typeof x === 'object'; }

// Create a element node.
function create(array){
  /* This function can create a single and multiple elements.

    If I forget how this works I will slap myself ;_; - Damian 2K19

    To create one element, it needs an array:
    create(['div',{ className:"text" }, "Hello"]);

    To create multiple Elements it takes an multidimensional array:
    create([ ['div', { className:"text" }, "HelloWorld!"], ['div', { className:"text" }, "This is my Page"] ]);

    Lets explain first the single element flow.
    The first if statement checks for an multidimensional array. If not, nothing happens.
    The second if statement checks if the first array value is an string.
    When creating an Element, the first value is always the elements tagname. It will result true.
    It will take the first value and create a node.
    After creating the node element, it will check if the second value is an object.
    This will add attributes like className, id, href etc to your node element and set the "i" variable to 2.
    array[0] is the tagname
    array[1] can be a object for the attributes, string to add a textnode or another array to add another node into the current node.
    array[2] can be a string to add a textnode or an array to create another node inside the current node.
    If the index "i" variable is set to 2, so it will skip the first and second value and loop the third one.
    If the third one is an array, it runs another create() function call.
    So things like this are possible:
    create(["p", ["span","Hello World!"]])
    or this
    create(["p", ["span","Hello "], ["span","World!"]])

  */
  let arr0 = array[0],
      arr1 = array[1];

  if( isArray(arr0) && isArray(arr1) ){
    let nodes = [];

    array.forEach(function(value){
      nodes.push(create(value));
    });

    return nodes;
  }

  if( !isString(arr0) ) return;

    let node = document.createElement(arr0),
        i = 1;

    if ( isObject(arr1) && arr1 !== null && !isArray(arr1) ){
      for (let attr in arr1) node[attr] = arr1[attr];
      i = 2;
    }

    let l = array.length;
    for (; i < l; i++){
      console.log(array[i]);
      // This if statement is triggered when create(["div", ["p","frontend.js"]]);
      if( isArray(array[i]) ) node.appendChild( create(array[i]) );

      // If the second or third value is an string, create a text node.
      else node.appendChild( document.createTextNode(array[i]) );
    }

    return node;
}
