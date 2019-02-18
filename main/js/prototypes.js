Object.prototype.loop = function(func) {
    const L = this.length;
    let i = 0;
    for (; i < L; i++) func(this[i]);
}


// AJAX CALL
const ajax = (file,method,formData) => {
  fetch(file, {
    method: method,
    body: formData
  }).then(function(res){
    return res.text();
  }).then(function(text){
    router(text);
  });
}

// Check if it's an array.
function isArray(x){
  return x instanceof Array;
}

// Create a JS element.
// create(["a", { href: "#"}, "myLink"]);
function create(x){
  let element = x[0],
      child = x[1],
      node = document.createElement(element),
      i = 1;

  if (typeof child === "object" && child !== null && !isArray(child)) {
    for (var attr in child) node[attr] = child[attr];
    i = 2;
  }

  let l = x.length;
  for (; i < l; i++) {
    if( isArray(x[i]) ) node.appendChild( create(x[i]) );
    else node.appendChild( document.createTextNode(x[i]) );
  }

  return node;
}

function innerNode(newNode, node) {
  node.parentNode.insertAfter(newNode, node);
}
