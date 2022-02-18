window.login = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "check-credentials", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
	if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || xhr.status === 400)) {
	    console.log(xhr.responseType);
	    console.log(xhr.response);
	    var outcome = document.getElementById("outcome");
	    outcome.replaceChildren();
	    outcome.append(xhr.response);
	}
    }
    
    xhr.send(JSON.stringify({
	username: document.getElementById("username").value,
	password: document.getElementById("password").value
    }));
};
