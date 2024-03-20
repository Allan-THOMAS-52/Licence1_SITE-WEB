//---------------------------------------TYPEWRITER---------------------------------------//

	var textSize = 0;
	var txtCanvas = 'Animation of the solar system';
	var textSpeed = 75;

	function typeWriterCanvas() {
	  if (textSize < txtCanvas.length) {
		document.getElementById("border1").innerHTML += txtCanvas.charAt(textSize);
		textSize++;
		setTimeout(typeWriterCanvas, textSpeed);
	  }
	}
	
var T6 = {
	//Define background canvas
	canvasbackground:document.getElementById('LAYER_BACKGROUND_T6'), //Grab the HTML5 Background Canvas (will only be drawn once)
	contextbackground:null,
	//Define foreground canvas
	canvasforeground:document.getElementById('LAYER_FOREGROUND_T6'), //Grab the HTML5 Foreground Canvas (elements on this canvas will be rendered every frame; moving objects)
	contextforeground:null,
	width:null,
	height:null,
	//Define framerate variables
	fps:60, //Set desired framerate
	now:null,
	then:Date.now(),
	interval:null,
	delta:null,
	//TPS
	nowTPS:null,
	thenTPS:Date.now(),
	avgTPSCount:0,
	TPSCount:0,
	deltaTPS:0,
	//FPS
	nowFPS:null,
	thenFPS:Date.now(),
	avgFPSCount:0,
	FPSCount:0,
	deltaFPS:0,
	
	julianCenturyInJulianDays:36525,
	julianEpochJ2000:2451545.0,
	julianDate:null,
	current:null,
	newDate:null,
	DAY:null,
	MONTH:null,
	YEAR:null,
	
//ELEMENTS @ J2000: a, e, i, mean longitude (L), longitude of perihelion, longitude of ascending node
planetElements: [
	//MERCURY (0)
	[0.38709927,0.20563593,7.00497902,252.25032350,77.45779628,48.33076593],
	//VENUS (1)
	[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255],
	//EARTH (2)
	[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0.0],
	//MARS (3)
	[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891],
	//JUPITER (4)
	[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909],
	//SATURN (5)
	[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448],
	//URANUS (6)
	[19.18916464,0.04725744,0.77263783,313.23810451,170.95427630,74.01692503],
	//NEPTUNE (7)
	[30.06992276,0.00859048,1.77004347,-55.12002969,44.96476227,131.78422574]
],
	
//RATES: a, e, i, mean longitude (L), longitude of perihelion, longitude of ascending node
planetRates: [
	//MERCURY (0)
	[0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.1253408],
	//VENUS (1)
	[0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418],
	//EARTH (2)
	[0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0.0],
	//MARS (3)
	[0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],
	//JUPITER (4)
	[-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],
	//SATURN (5)
	[-0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794],
	//URANUS (6)
	[-0.00196176,-0.00004397,-0.00242939,428.48202785,0.40805281,0.04240589],
	//NEPTUNE (7)
	[0.00026291,0.00005105,0.00035372,218.45945325,-0.32241464,-0.00508664]
],
	
	orbitalElements:null,
	
	xMercury:null,
	yMercury:null,
	xVenus:null,
	yVenus:null,
	xEarth:null,
	yEarth:null,
	xMars:null,
	yMars:null,
	xJupiter:null,
	yJupiter:null,
	xSaturn:null,
	ySaturn:null,
	xUranus:null,
	yUranus:null,		
	xNeptune:null,
	yNeptune:null,			
	
	scale:70,
	
	//Divide AU multiplier by this number to fit it into  "orrery" style solar system (compressed scale)
	jupiterScaleDivider:2.5, 
	saturnScaleDivider:3.5,
	uranusScaleDivider:6.2,
	neptuneScaleDivider:8.7
}

init_T6();

function init_T6(){
	T6.contextbackground = T6.canvasbackground.getContext('2d'); //Need the context to be able to draw on the canvas
	T6.contextforeground = T6.canvasforeground.getContext('2d'); //Need the context to be able to draw on the canvas

	T6.width = T6.canvasforeground.width;
	T6.height = T6.canvasforeground.height;

	T6.interval = 1000/T6.fps;
	
	//1. Get Gregorian Date
	//T6.current = new Date(); //Set as today
	T6.current = new Date(Date.UTC(2000, 0, 2,0,0,0)); //Set at Epoch (J2000)			
		
	T6.DAY = T6.current.getDate();
	T6.MONTH = T6.current.getMonth()+1; //January is 0!
	T6.YEAR = T6.current.getFullYear();
	//2. Get Julian Date
	T6.julianDate = getJulianDate_T6(T6.YEAR,T6.MONTH,T6.DAY);
	//3. Get Julian Centuries since Epoch (J2000)
	T6.T = (T6.julianDate-T6.julianEpochJ2000)/T6.julianCenturyInJulianDays; 
	
	//Render background once (render the Sun at center)
	renderBackground_T6();	
	//Start the main loop
	run_T6();
}

//Loop Function that runs as fast as possible (logic speed)
function run_T6(){
	T6.now = Date.now();
	T6.delta = T6.now - T6.then;
	
	//Run this code based on desired rendering rate
	if (T6.delta > T6.interval){ 
		T6.then = T6.now - (T6.delta % T6.interval);
		
		//Keep track of FPS
		T6.FPSCount++;
		T6.nowFPS = Date.now();
		T6.deltaFPS = T6.nowFPS - T6.thenFPS;
		if(T6.deltaFPS > 1000){ //Update frame rate every second
				T6.avgFPSCount = T6.FPSCount;
				T6.FPSCount = 0;
				T6.thenFPS = T6.nowFPS - (T6.deltaFPS % 1000);
		}
		
		//Increase date by 1 day each frame
		updateDate_T6(1);
		
		//Get Mercury Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,0);T6.xMercury = T6.orbitalElements[0];T6.yMercury = T6.orbitalElements[1];
		//Get Venus Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,1);T6.xVenus = T6.orbitalElements[0];T6.yVenus = T6.orbitalElements[1];
		//Get Earth Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,2);T6.xEarth = T6.orbitalElements[0];T6.yEarth = T6.orbitalElements[1];
		//Get Mars Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,3);T6.xMars = T6.orbitalElements[0];T6.yMars = T6.orbitalElements[1];
		//Get Jupiter Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,4);T6.xJupiter = T6.orbitalElements[0];T6.yJupiter = T6.orbitalElements[1];
		//Get Saturn Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,5);T6.xSaturn = T6.orbitalElements[0];T6.ySaturn = T6.orbitalElements[1];
		//Get Uranus Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,6);T6.xUranus = T6.orbitalElements[0];T6.yUranus = T6.orbitalElements[1];		
		//Get Neptune Heliocentric Ecliptic Coordinates
		T6.orbitalElements = plotPlanet_T6(T6.T,7);T6.xNeptune = T6.orbitalElements[0];T6.yNeptune = T6.orbitalElements[1];				
	}

	//Keep track of TPS
	T6.TPSCount++;
	T6.nowTPS = Date.now();
	T6.deltaTPS = T6.nowTPS - T6.thenTPS;
	if(T6.deltaTPS > 1000){ //Update frame rate every second
			T6.avgTPSCount = T6.TPSCount;
			T6.TPSCount = 0;
			T6.thenTPS = T6.nowTPS - (T6.deltaTPS % 1000);
	}
	
	//schedules a callback invocation before the next repaint. The number of callbacks performed is usually 60 times per second
	requestAnimationFrame(renderForeground_T6); //Call requestAnimationFrame to draw to the screen (native way for browsers to handle animation) --> This does not affect the FPS, but dramatically improves TPS

	//Loop as fast as we can
	setTimeout(run_T6,0);
}

//RENDER BACKGROUND. ONLY INCLUDES STATIC ELEMENTS ON SCREEN.
function renderBackground_T6(){
	//Set background color of canvas
	T6.contextbackground.fillStyle='black';
	T6.contextbackground.fillRect(0,0,T6.width,T6.height); //"ClearRect" by painting background color			
	
	//render Sun at center
	T6.contextbackground.beginPath();
	T6.contextbackground.arc(T6.width/2, T6.height/2, 10, 0, 2*Math.PI, true); 
	T6.contextbackground.fillStyle = 'yellow';
	T6.contextbackground.fill();
	T6.contextbackground.closePath();				
}

//RENDER FOREGROUND. INCLUDES ALL DYNAMIC ELEMENTS ON SCREEN.
function renderForeground_T6(){
	//Clear the canvas (otherwise there will be "ghosting" on foreground layer)
	T6.contextforeground.clearRect(0, 0, T6.width, T6.height);	

	//INNER PLANETS
	//Render planet Mercury
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xMercury*T6.scale), (T6.height/2)-(T6.yMercury*T6.scale), (3+(0.5*(4879/10000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'lightgrey';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();				
	//Render planet Venus
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xVenus*T6.scale), (T6.height/2)-(T6.yVenus*T6.scale),(3+(0.5*(12104/10000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'BurlyWood';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();				
	//Render planet Earth
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xEarth*T6.scale), (T6.height/2)-(T6.yEarth*T6.scale),  (3+(0.5*(12756/10000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'SteelBlue';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();				
	//Render planet Mars
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xMars*T6.scale), (T6.height/2)-(T6.yMars*T6.scale), (3+(0.5*(6792/10000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'red';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();	
	
	//OUTER PLANETS
	//Render planet Jupiter
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xJupiter*T6.scale/T6.jupiterScaleDivider), (T6.height/2)-(T6.yJupiter*T6.scale/T6.jupiterScaleDivider), (4+(0.5*(142984/13000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'Peru';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();					
	//Render planet Saturn
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xSaturn*T6.scale/T6.saturnScaleDivider), (T6.height/2)-(T6.ySaturn*T6.scale/T6.saturnScaleDivider), (4+(0.5*(120536/13000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'AliceBlue';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();						
	//Render planet Uranus
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xUranus*T6.scale/T6.uranusScaleDivider), (T6.height/2)-(T6.yUranus*T6.scale/T6.uranusScaleDivider), (4+(0.5*(51118/13000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = 'LightSkyBlue';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();	
	//Render planet Neptune
	T6.contextforeground.beginPath();
	T6.contextforeground.arc((T6.width/2)+(T6.xNeptune*T6.scale/T6.neptuneScaleDivider), (T6.height/2)-(T6.yNeptune*T6.scale/T6.neptuneScaleDivider), (4+(0.5*(49528/13000))), 0, 2*Math.PI, true); 
	T6.contextforeground.fillStyle = '#3C71DE';
	T6.contextforeground.fill();
	T6.contextforeground.closePath();	
		
	//Render Frames Per Second (using desired framerate)
	T6.contextforeground.font = "20px Arial";
	T6.contextforeground.textAlign = "left";
	T6.contextforeground.fillStyle = "white";
	T6.contextforeground.fillText("FPS = "+T6.avgFPSCount,10,20);				
	
	//Render Ticks Per Second (how many loops are executed per second)
	T6.contextforeground.font = "20px Arial";
	T6.contextforeground.textAlign = "right";
	T6.contextforeground.fillStyle = "white";
	T6.contextforeground.fillText("TPS = "+T6.avgTPSCount,T6.width-10,20);

	
}

function getJulianDate_T6(Year,Month,Day){
	var inputDate = new Date(Year,Month,Math.floor(Day));
	var switchDate = new Date("1582","10","15");

	var isGregorianDate = inputDate >= switchDate;

	//Adjust if B.C.
	if(Year<0){
		Year++;
	}

	//Adjust if JAN or FEB
	if(Month==1||Month==2){
		Year = Year - 1;
		Month = Month + 12;
	}

	//Calculate A & B; ONLY if date is equal or after 1582-Oct-15
	var A = Math.floor(Year/100); //A
	var B = 2-A+Math.floor(A/4); //B
	
	//Ignore B if date is before 1582-Oct-15
	if(!isGregorianDate){B=0;}
					
	return ((Math.floor(365.25*Year)) + (Math.floor(30.6001*(Month+1))) + Day + 1720994.5 + B);			
}

function updateDate_T6(increment){
	T6.newDate = new Date(T6.current.getFullYear(), T6.current.getMonth(), T6.current.getDate()+increment); //Set to today +1 day
	T6.current = T6.newDate;

	newdd = T6.newDate.getDate();
	newmm = T6.newDate.getMonth()+1; //January is 0!
	newyyyy = T6.newDate.getFullYear();

	T6.YEAR = newyyyy;
	T6.MONTH = newmm;
	T6.DAY = newdd;
	
	T6.julianDate = getJulianDate_T6(T6.YEAR,T6.MONTH,T6.DAY);
	T6.T = (T6.julianDate-T6.julianEpochJ2000)/T6.julianCenturyInJulianDays; 
}

function plotPlanet_T6(TGen,planetNumber){
	//--------------------------------------------------------------------------------------------
	//1.
	//ORBIT SIZE
	//AU (CONSTANT = DOESN'T CHANGE)
	aGen = T6.planetElements[planetNumber][0] + (T6.planetRates[planetNumber][0] * TGen);
	//2.
	//ORBIT SHAPE
	//ECCENTRICITY (CONSTANT = DOESN'T CHANGE)
	eGen = T6.planetElements[planetNumber][1] + (T6.planetRates[planetNumber][1] * TGen);
	//--------------------------------------------------------------------------------------------
	//3.
	//ORBIT ORIENTATION
	//ORBITAL INCLINATION (CONSTANT = DOESN'T CHANGE)
	iGen = T6.planetElements[planetNumber][2] + (T6.planetRates[planetNumber][2] * TGen);
	iGen = iGen%360;
	//4.
	//ORBIT ORIENTATION
	//LONG OF ASCENDING NODE (CONSTANT = DOESN'T CHANGE)
	WGen = T6.planetElements[planetNumber][5] + (T6.planetRates[planetNumber][5] * TGen);
	WGen = WGen%360;
	//5.
	//ORBIT ORIENTATION
	//LONGITUDE OF THE PERIHELION
	wGen = T6.planetElements[planetNumber][4] + (T6.planetRates[planetNumber][4] * TGen);
	wGen = wGen%360;
	if(wGen<0){wGen = 360+wGen;}	
	//--------------------------------------------------------------------------------------------
	//6.
	//ORBIT POSITION
	//MEAN LONGITUDE (DYNAMIC = CHANGES OVER TIME)
	LGen = T6.planetElements[planetNumber][3] + (T6.planetRates[planetNumber][3] * TGen);
	LGen = LGen%360;
	if(LGen<0){LGen = 360+LGen;}	
	
	
	//MEAN ANOMALY --> Use this to determine Perihelion (0 degrees = Perihelion of planet)
	MGen = LGen - (wGen);
	if(MGen<0){MGen=360+MGen;}

	//ECCENTRIC ANOMALY
	EGen = EccAnom_T6(eGen,MGen,6);
	
	//ARGUMENT OF TRUE ANOMALY
	trueAnomalyArgGen = (Math.sqrt((1+eGen) / (1-eGen)))*(Math.tan(toRadians_T6(EGen)/2));

	//TRUE ANOMALY (DYNAMIC = CHANGES OVER TIME)
	K = Math.PI/180.0; //Radian converter variable
	if(trueAnomalyArgGen<0){ 
		nGen = 2 * (Math.atan(trueAnomalyArgGen)/K+180); //ATAN = ARCTAN = INVERSE TAN
	}
	else{
		nGen = 2 * (Math.atan(trueAnomalyArgGen)/K)
	}
	//--------------------------------------------------------------------------------------------
	
	//CALCULATE RADIUS VECTOR
	rGen = aGen * (1 - (eGen * (Math.cos(toRadians_T6(EGen)))));
	
	//TAKEN FROM: http://www.stargazing.net/kepler/ellipse.html
	//CREDIT: Keith Burnett
	//Used to determine Heliocentric Ecliptic Coordinates
	xGen = rGen *(Math.cos(toRadians_T6(WGen)) * Math.cos(toRadians_T6(nGen+wGen-WGen)) - Math.sin(toRadians_T6(WGen)) * Math.sin(toRadians_T6(nGen+wGen-WGen)) * Math.cos(toRadians_T6(iGen)));
	yGen = rGen *(Math.sin(toRadians_T6(WGen)) * Math.cos(toRadians_T6(nGen+wGen-WGen)) + Math.cos(toRadians_T6(WGen)) * Math.sin(toRadians_T6(nGen+wGen-WGen)) * Math.cos(toRadians_T6(iGen)));
	zGen = rGen *(Math.sin(toRadians_T6(nGen+wGen-WGen))*Math.sin(toRadians_T6(iGen)));

	return [xGen, yGen];
}

//TAKEN FROM: http://www.jgiesen.de/kepler/kepler.html
//CREDIT: Juergen Giesen
//Used to solve for E
function EccAnom_T6(ec,m,dp) {
	// arguments:
	// ec=eccentricity, m=mean anomaly,
	// dp=number of decimal places

	var pi=Math.PI, K=pi/180.0;
	var maxIter=30, i=0;
	var delta=Math.pow(10,-dp);
	var E, F;

	m=m/360.0;
	m=2.0*pi*(m-Math.floor(m));

	if (ec<0.8) E=m; else E=pi;

	F = E - ec*Math.sin(m) - m;

	while ((Math.abs(F)>delta) && (i<maxIter)) {
		E = E - F/(1.0-ec*Math.cos(E));
		F = E - ec*Math.sin(E) - m;
		i = i + 1;
	}

	E=E/K;

	return Math.round(E*Math.pow(10,dp))/Math.pow(10,dp);
}

function toRadians_T6(deg){
	return deg * (Math.PI / 180);
}

function round_T6(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}