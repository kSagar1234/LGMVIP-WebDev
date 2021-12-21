// submit button
class ContactUs {
	constructor() {
		this.formEle = document.getElementById("contactForm");
		this.emailEle = document.getElementById("email");
		this.nameEle = document.getElementById("name");
		this.subjectEle = document.getElementById("subject");
		this.messageEle = document.getElementById("message");
		this.statusEle = document.getElementById("status");
	}
	setStatus(content) {
		this.removeLoading();
		this.statusEle.classList.add("statusActive");
		this.statusEle.innerHTML = content;
	}
	removeStatus() {
		this.statusEle.classList.remove("statusActive");
		this.statusEle.innerHTML = ``;
	}
	addLoading() {
		this.loading.classList.add("loadingActive");
	}
	removeLoading() {
		this.loading.classList.remove("loadingActive");
	}
	isEmpty(value) {
		return (value.trim().length == 0) ? true : false;
	}
	invalidLength(value, len) {
		return (value.length > len) ? true : false;
	}
	validateEmail(email) {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	initialize() {
		this.formEle.onsubmit = (e) => {
			e.preventDefault();
			this.removeStatus();
			this.validateForm();
		}
		
	}
	validateForm() {
		
		let hasErrors = false;
		
		
		let errors = `<p class="gradientColor">Problem : Follow above guidelines and resubmit.</p>`;
		if (this.nameEle.value == null || this.nameEle.value == "" || this.nameEle.value.length > 60) {
			error++;
			hasErrors = true;
		}
		

		if (this.emailEle.value == null || this.emailEle.value == "") {
			error++;
			hasErrors = true;
		}


		if (this.subjectEle.value == null || this.subjectEle.value == "" || this.subjectEle.value.length > 180) {
			error++;
			hasErrors = true;
		}


		if (this.messageEle.value == null || this.messageEle.value == "") {
			error++;
			hasErrors = true;
		}

		if (hasErrors) {
			this.setStatus(errors);
		} else {
			let data = {
				name: this.nameEle.value,
				email: this.emailEle.value,
				subject: this.subjectEle.value,
				message: this.messageEle.value,
				dateString: (new Date()).toString()
			};
			this.sendData(JSON.stringify(data));
		}
	} catch(err) {
		console.log(err);
	}


	sendData(jsonData) {
		const url = './php/ContactUs.php';
		let xhttp = new XMLHttpRequest();
		let that = this;
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				try {
					// console.log(this.responseText);

					let data = JSON.parse(this.responseText);

					/*
					When everything goes right
					*/
					if (data['status'].toString().toLowerCase() == 'true') {
						that.setStatus(`<p class="gradientColor">Thank you for contacting us. We will get back to you`);
						that.formEle.reset();
					} else {
						that.setStatus(`<p class="gradientColor">Looks like you have supplied invalid data or there is a problem with our server. Try again</p>`);
					}
				} catch (err) {
					that.setStatus(`<p class="gradientColor">Looks like you have supplied invalid data or there is a problem with our server. Try again</p>`);
				}
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(`data=${jsonData}`);
	}


}
const fb = new ContactUs();
fb.initialize();