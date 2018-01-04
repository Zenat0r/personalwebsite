export default class form{
	constructor(){
		this.form = $("form");
		this.name = $("input[name=fullname]");
		this.email = $("input[name=email]");
		this.description = $("textarea[name=description]");
	}

	send(){
		console.log('start sending');
		const req = new XMLHttpRequest();
		let form = this.form;
		let baseUrl = window.location.protocol + "//" + window.location.hostname;

		req.onreadystatechange = function () {   
		    if (this.readyState === 4) {
		        if (this.status === 200) {
		        	console.log('send');  
		            form.html("<h3>Message bien envoyé !</h3>");     	
		        } else {
		            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
		        }
		    }
		};

		req.open('POST', baseUrl + '/public/script/mail.php', true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		req.send("name=" + this.name.val() + "&email=" + this.email.val() + "&description=" + this.description.val());
	}
}