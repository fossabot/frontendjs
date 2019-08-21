Array.prototype.remove = function(value){
    this.splice(this.indexOf(value), 1);
};
  
Array.prototype.pushUnique = function(value){
    if(this.indexOf(value) === -1){
        this.push(value);
    }
};
