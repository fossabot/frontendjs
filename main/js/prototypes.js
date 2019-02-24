Object.prototype.loop = function(func) {
    const l = this.length;
    let i = 0;
    for (; i < l; i++) func(this[i]);
}

const e = (tag) => document.getElementsByTagName(tag),
     id = (id) => document.getElementById(id);

// AJAX CALL
function ajax(file,method,formData){
  fetch(file, {
    method: method,
    body: formData
  }).then(function(res){
    return res.text();
  }).then(function(text){
    console.log(text);
  });
}

// Form listener for Ajax
let forms = e('form');
console.dir(forms);

for (var i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', function(e){
		e.preventDefault();
		const formData = new FormData(this),
			method = 'POST',
			action = this.getAttribute('action');
		ajax(action,method,formData);
		this.reset();
	});
}

function innerNode(newNode, node) {
  node.parentNode.insertAfter(newNode, node);
}
