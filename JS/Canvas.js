


//-----------------------------------------CANVAS---------------------------------------//

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || // Standardised form
	window.webkitRequestAnimationFrame || //  Chrome & Safari
	window.mozRequestAnimationFrame|| //Firefox
	window.oRequestAnimationFrame || // Opera 
	window.msRequestAnimationFrame  || //Internet Explorer
	
	 function(callback){ // Another
     window.setTimeout(callback, 1000 / 60); }; 
	 
} )(); 

//---------- canvas's definition ---------- 

	var canv = document.getElementById('canv');
	var context = canv.getContext('2d');

//---------- GUI's variables ---------- 

	var speed = 0.73;
	var planetValue;
	var pl2ColorSave = "#507EDC";
	var	satelliteColorSave = "#DFD6D3";
	var checkedSavePl1;
	var checkedSaveSat;
	document.getElementById("radio").style.visibility = "hidden";
	document.getElementById("colorDiv").style.visibility = "hidden";
	document.getElementById("speedDiv").style.visibility = "hidden";

//---------- sun ---------- 

	var sunPosX = canv.width/2;  
	var sunPosY = canv.height/2;
	var sunDiam = 100;
	var sunColor = "yellow";

//---------- Planet 1 ---------- 

	var planet1PosX = 70; 
	var planet1PosY = 70;
	var planet1Diam = 20;
	var planet1Color = "lightgrey";
	var planet1Speed = 1;

//---------- Planet 2 ---------- 

	var planet2PosX = 180;  
	var planet2PosY = 0;
	var planet2Diam = 30;
	var planet2Color = "#507EDC";
	var planet2Speed = speed;

//---------- planet's 2 satellite ---------- 

	var satellitePosX = 30;
	var satellitePosY = 0;
	var satelliteDiam = 10;
	var satelliteColor = "#DFD6D3";
	var satelliteSpeed = 0.3;

//---------- Planet show/hide ----------
	
	function showPl()
	{	
		if(planetValue == "Ea")
		{				
			planet2Color = pl2ColorSave;
			document.getElementById("ColorPl").value = pl2ColorSave;
			document.getElementById("colorDiv").style.visibility = "visible";
			checkedSave = "show";			

		}
		if(planetValue == "Mo")
		{
			satelliteColor = satelliteColorSave;
			document.getElementById("ColorPl").value = satelliteColorSave;
			document.getElementById("colorDiv").style.visibility = "visible";
			checkedSave = "show";
		}
	}
	
	function hidePl()
	{
		if(planetValue == "Ea")
		{	
			pl2ColorSave = planet2Color;
			planet2Color = "black";
			document.getElementById("ColorPl").value = planet2Color;
			document.getElementById("colorDiv").style.visibility = "hidden";
			checkedSavePl1 = "hide";
		}
		if(planetValue == "Mo")
		{
			satelliteColorSave = satelliteColor;
			satelliteColor = "black";
			document.getElementById("ColorPl").value = satelliteColor;
			document.getElementById("colorDiv").style.visibility = "hidden";
			checkedSaveSat = "hide";			
		}
	}
	
	function resetShHi()
	{
		document.getElementById("Show").checked = true;
		if(planetValue == "Ea")
		{				
			planet2Color = pl2ColorSave;
			document.getElementById("ColorPl").value = pl2ColorSave;
			document.getElementById("colorDiv").style.visibility = "visible";
		}
		if(planetValue == "Mo")
		{
			satelliteColor = satelliteColorSave;
			document.getElementById("ColorPl").value = satelliteColorSave;
			document.getElementById("colorDiv").style.visibility = "visible";
		}
	}
	
//---------- Planet selector ----------
 		
	document.getElementById("SelectPlanet").addEventListener("change", function() {		
		onChange(this.value);
		if(planetValue == "Ea")
		{				
			document.getElementById("speedBase").innerHTML = "&#124; Base value : 0.73";
			document.getElementById("Eccent").value = 0.73 ;
			document.getElementById("speedShow").innerHTML = "0.73";
			document.getElementById("ColorPl").value = planet2Color ;
			document.getElementById("speedDiv").style.visibility = "visible";
			document.getElementById("colorDiv").style.visibility = "visible";
			document.getElementById("radio").style.visibility = "visible";			
		}
		if(planetValue == "Mo")
		{
			document.getElementById("speedBase").innerHTML = "&#124; Base value : 0.3";
			document.getElementById("Eccent").value = 0.3 ;
			document.getElementById("speedShow").innerHTML = "0.3";
			document.getElementById("ColorPl").value = satelliteColor ;
			document.getElementById("speedDiv").style.visibility = "visible";
			document.getElementById("colorDiv").style.visibility = "visible";
			document.getElementById("radio").style.visibility = "visible";			 	
		}
		if(planetValue == "NaN")
		{
			document.getElementById("speedDiv").style.visibility = "hidden";
			document.getElementById("colorDiv").style.visibility = "hidden";
			document.getElementById("radio").style.visibility = "hidden";			
		}
	});
	function onChange(change){
		planetValue = change;	
	}
	
//---------- Planet speed selector ---------- 

	document.getElementById("Eccent").addEventListener("input", function() {
		
		document.getElementById("speedShow").innerHTML = this.value;
		
		if(planetValue == "Ea")
		{
			planet2Speed = this.value;	
			
		}
		if(planetValue == "Mo")
		{
			satelliteSpeed = this.value;
			
		}	
				
	});

//---------- Planet color selector ---------- 

	document.getElementById("ColorPl").addEventListener("input", function() {
		if(planetValue == "Ea")
		{
			planet2Color = this.value;	
		}
		if(planetValue == "Mo")
		{
			satelliteColor = this.value;
		}				
	});	

//---------- drawing ----------  

	var i = 0;

	function animate(){
		
		context.clearRect(0, 0, canv.width, canv.height);
		
		//Fond noir
		context.fillStyle = "black";  
		context.fillRect(0, 0, canv.width, canv.height);
		
		//sun's drawing
		context.beginPath(); 
		context.arc(sunPosX, sunPosY, sunDiam/2, 0, Math.PI*2);
		context.fillStyle = sunColor;
		context.fill();
		context.save();  //planet 1
		context.translate(canv.width/2,canv.height/2);
		context.rotate(i * planet1Speed);
		context.beginPath();
		context.arc(planet1PosX, planet1PosY, planet1Diam/2, 0, Math.PI*2);
		context.fillStyle = planet1Color;
		context.fill();
		context.restore();
		context.save(); //planet 2
		context.translate(canv.width/2,canv.height/2);
		context.rotate(i * planet2Speed);
		context.beginPath();
		context.arc(planet2PosX, planet2PosY, planet2Diam/2, 0, Math.PI*2);
		context.fillStyle = planet2Color;
		context.fill();
		context.save(); //planet's 2 satellite
		context.translate(planet2PosX, planet2PosY);
		context.rotate(i * satelliteSpeed);
		context.beginPath();
		context.arc(satellitePosX, satellitePosY, satelliteDiam/2, 0, Math.PI*2);
		context.fillStyle = satelliteColor;
		context.fill();
		
		context.restore(); 
		context.restore();
		
		i -= 0.01;
		window.requestAnimFrame(function() { animate() });
	}
	animate();




	contexte.beginPath();
	contexte.quadraticCurveTo(X/2, 10, X-100,Y/2); 
	


//---------------------------------------SCROLL BUTTON---------------------------------------//

	window.onscroll = function() {scrollFunction()};

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
 






