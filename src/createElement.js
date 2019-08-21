function createElement (array){
  if(typeof array === "string"){
    return document.createElement(array);
  }else{
    // Create parent node element.
    const node = document.createElement(array[0]);

    for(let i = 1, l = array.length; i < l; i++){
      // If value is a string or number, set a text content.
      if(typeof array[i] === "string" || typeof array[i] === "number"){
        const text = document.createTextNode(array[i]);
        node.appendChild(text);
        continue;
      }

      // If value is an array, create and append the element.
      if(array[i] instanceof Array){
        node.appendChild(createElement(array[i]));
        continue;
      }else if(typeof array[i] === "object"){
        const key = Object.keys(array[i]);
        const value = Object.values(array[i]);
        for(let i = 0; i < key.length; i++){
          node[key[i]] = value[i];
        }
      }
    }

    return node;
  }
}
