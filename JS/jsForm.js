


//-------------------------------------------Modal Form-------------------------------------------------------------------------------------------//

var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
   if (event.target == modal) {
    modal.style.display = "none";
  }
}

//--------------------------PSW GENERATOR-------------------------

var password=document.getElementById("password");
function genPassword() {
	var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var passwordLength = 10;
	var password = "";
	for (var i = 0; i <= passwordLength; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber +1);
	}
	document.getElementById("password").value = password;

}

//------------------------PSW VALIDATOR-------------------------------

var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var nombre = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    nombre.classList.remove("invalid");
    nombre.classList.add("valid");
  } else {
    nombre.classList.remove("valid");
    nombre.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

//--------------------------HIDE/SHOW------------------------

function hideElem() {
    document.getElementById("myDIV").style.visibility = "hidden"; 
}

function showElem() {
    document.getElementById("myDIV").style.visibility = "visible"; 
}

