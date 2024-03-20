
window.onscroll = function() {myFunction(),scrollFunction()};


//---------------------------------------STICKY NAV--------------------------------------------------------------------------------------------------------------//

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//---------------------------------------SCROLL BUTTON--------------------------------------------------------------------------------------------------------------//


var mybutton = document.getElementById("myBtn");
var nombre;

mybutton.style.display = "block";

document.getElementById("myBtn").innerHTML = "&darr;";

function scrollFunction() {
	if (document.body.scrollTop >( document.body.scrollHeight/2) || document.documentElement.scrollTop > (document.documentElement.scrollHeight/2)) {
		nombre=1;
		document.getElementById("myBtn").innerHTML = "&uarr;"; 
	} else {
		nombre=2;
		document.getElementById("myBtn").innerHTML = "&darr;";
	}
}

function topFunction() {
	if (nombre==1)
	{
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;		
	} else {
		window.scrollTo(0,document.body.scrollHeight);		
	}
}

//----------------------------------TYPING EFFECT--------------------------------------

var i = 0;
var txtMercury = 'Mercury';
var txtVenus = 'Venus';
var txtEarth = 'The Earth';
var txtMars = 'Mars';
var txtJupiter = 'Jupiter';
var txtSaturn = 'Saturn';
var txtUranus = 'Uranus';
var txtNeptune = 'Neptune';

var speed = 75;

function typeWriterMercury() {
  if (i < txtMercury.length) {
    document.getElementById("border1").innerHTML += txtMercury.charAt(i);
    i++;
    setTimeout(typeWriterMercury, speed);
  }
}
function typeWriterVenus() {
  if (i < txtVenus.length) {
    document.getElementById("border1").innerHTML += txtVenus.charAt(i);
    i++;
    setTimeout(typeWriterVenus, speed);
  }
}
function typeWriterEarth() {
  if (i < txtEarth.length) {
    document.getElementById("border1").innerHTML += txtEarth.charAt(i);
    i++;
    setTimeout(typeWriterEarth, speed);
  }
}
function typeWriterMars() {
	
  if (i < txtMars.length) {
    document.getElementById("border1").innerHTML += txtMars.charAt(i);
    i++;
    setTimeout(typeWriterMars, speed);
  }
}
function typeWriterJupiter() {
  if (i < txtJupiter.length) {
    document.getElementById("border1").innerHTML += txtJupiter.charAt(i);
    i++;
    setTimeout(typeWriterJupiter, speed);
  }
}
function typeWriterSaturn() {
  if (i < txtSaturn.length) {
    document.getElementById("border1").innerHTML += txtSaturn.charAt(i);
    i++;
    setTimeout(typeWriterSaturn, speed);
  }
}
function typeWriterUranus() {
  if (i < txtUranus.length) {
    document.getElementById("border1").innerHTML += txtUranus.charAt(i);
    i++;
    setTimeout(typeWriterUranus, speed);
  }
}
function typeWriterNeptune() {
  if (i < txtNeptune.length) {
    document.getElementById("border1").innerHTML += txtNeptune.charAt(i);
    i++;
    setTimeout(typeWriterNeptune, speed);
  }
}

//---------------------------------------SLIDESHOW--------------------------------------------------------------------------------------------------------------//

var slideIndex = 0;
showSlides();

function showSlides() {
	
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
	slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {slideIndex = 1}
	slides[slideIndex-1].style.display = "block";
	
	setTimeout(showSlides, 5000); // Change image every 5 seconds  
}
