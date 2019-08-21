function ajax (method, path, func){
  const req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
      func(JSON.parse(this.responseText));
    }
  };

  req.open(method, path, true);
  req.send();
}
  