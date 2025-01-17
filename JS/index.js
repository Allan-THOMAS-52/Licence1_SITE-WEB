var i = 0;
var txtHome = 'The Solar System';
var speed = 75;
function typeWriterHome() {
  if (i < txtHome.length) {
    document.getElementById("border1").innerHTML += txtHome.charAt(i);
    i++;
    setTimeout(typeWriterHome, speed);
  }
}
//---------------------------------------SCROLL BUTTON--------------------------------------------------------------------------------------------------------------//

window.onscroll = function() {scrollFunction()};

var mybutton = document.getElementById("myBtn");
var number;

mybutton.style.display = "block";

document.getElementById("myBtn").innerHTML = "&darr;";

function scrollFunction() {
	if (document.body.scrollTop >( document.body.scrollHeight/2) || document.documentElement.scrollTop > (document.documentElement.scrollHeight/2)) {
		number=1;
		document.getElementById("myBtn").innerHTML = "&uarr;"; 
	} else {
		number=2;
		document.getElementById("myBtn").innerHTML = "&darr;";
	}
}

function topFunction() {
	if (number==1)
	{
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;		
	} else {
		window.scrollTo(0,document.body.scrollHeight);		
	}
}



// LANDING PAGE ANIMATION
let scene = document.getElementById("scene");
let parallaxInstance = new Parallax(scene);

let keys = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];
let slider = new Swiper(".swiper-container", {
  // Optional parameters
  slidesPerView: "auto",
  spaceBetween: 150,
  centeredSlides: true,
  mousewheel: true,
  pagination: {
    el: ".planet-links",
    clickable: true,
    renderBullet: function(index, className) {
      return '<div class="' + className + '">' + keys[index] + "</div>";
    }
  }
});


slider.on("slideChange", function() {
  console.log("SLIDE CHANGED");
  gsap.to(".slide-text span", 0.2, {
    x: "-100px"
  });
  gsap.to(".slide-number span", 0.2, {
    x: "-100px"
  });
  gsap.to(".slide-detail span", 0.5, {
    x: "-1000px"
  });
  gsap.to(".slide-detail-facts div", 0.5, {
    x: "-1000px"
  });
  gsap.to(".swiper-slide-active", 0.5, {
    scale: 0.85
  });
  gsap.to(".swiper-slide .slide-img", 1, {
    rotation: 20
  });
});

slider.on("slideChangeTransitionEnd", function() {
  gsap.to(".swiper-slide .slide-img", 1, {
    rotation: 10
  });
  gsap.to(".slide-text span", 0.2, {
    x: 0,
    delay: 0.1
  });
  gsap.to(".slide-text span", 0, {
    x: "100px"
  });

  gsap.to(".slide-number span", 0.2, {
    x: 0
  });
  gsap.to(".slide-number span", 0, {
    x: "100px"
  });

  gsap.to(".slide-detail span", 0.2, {
    x: 0
  });

  gsap.to(".slide-detail-facts div", 0.5, {
    x: 0
  });

  gsap.to(".swiper-slide-active", 0.5, {
    scale: 1,
    ease: Power4.easeOut
  });

  gsap.to(".swiper-slide-active .slide-text", 0, {
    autoAlpha: 1
  });
  gsap.to(".swiper-slide-active .slide-number", 0, {
    autoAlpha: 1
  });

  gsap.to(".swiper-slide-next .slide-text", 0, {
    autoAlpha: 0
  });
  gsap.to(".swiper-slide-prev .slide-text", 0, {
    autoAlpha: 0
  });

  gsap.to(".swiper-slide-next .slide-number", 0, {
    autoAlpha: 0
  });
  gsap.to(".swiper-slide-prev .slide-number", 0, {
    autoAlpha: 0
  });
});

gsap.to(".rockbg1", 2, {
  y: 12,
  repeat: -1,
  yoyo: true,
  delay: 0
});

gsap.to(".swiper-slide-next .slide-text", 0, {
  autoAlpha: 0
});
gsap.to(".swiper-slide-prev .slide-text", 0, {
  autoAlpha: 0
});

gsap.to(".swiper-slide-next .slide-number", 0, {
  autoAlpha: 0
});
gsap.to(".swiper-slide-prev .slide-number", 0, {
  autoAlpha: 0
});

gsap.to(".swiper-slide", 0, {
  scale: 0.85
});

gsap.to(".swiper-slide-active", 0, {
  scale: 1
});

