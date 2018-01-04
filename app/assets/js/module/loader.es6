import TweenMax from "gsap";
import assetsLoader from "assets-loader";

export default class Loader{
	constructor(){
		this.loaderDOM =  $(".loader");
		this.loaderTextDOM = $(".loader .load-state");
		this.progressionDOM = $(".loader .progression");
	
		this.loadAssets();
	}	
	loadAssets(){
		let imgUrl = window.location.protocol + "//" + window.location.hostname + "/public/img/";
		let loader = assetsLoader({
	        assets: [	          
	           imgUrl + "Christophe-Sieradzki.png",
	           imgUrl + "eilco.png",
	           imgUrl + "eilco.jpg",
	           imgUrl + "email.png",
	           imgUrl + "GitHub.png",        
	           imgUrl + "important.png",
	           imgUrl + "linkedIn.png",
	           imgUrl + "associatif/fullLogo.png",
	           imgUrl + "associatif/cover.jpg",
	           imgUrl + "education/dublin.jpg",
	           imgUrl + "education/calais-people.jpg",
	           imgUrl + "portfolio/hack1.jpg",
	           imgUrl + "portfolio/hack2.jpg",
	           imgUrl + "portfolio/Logo-Collaboratif.png",
	           imgUrl + "projetPro/projetPro.jpg",
	           imgUrl + "projetPro/UQAC.png"
	        ]
	    })	    
	    .on('progress',(progress) => {
	        this.progress(progress);
	    })
	    .on('complete',(assets) => {
	        this.hide();
	    })
	    .start();
	}

	progress(p){		
		this.progressionDOM.css("width", p*100 + "%");
		this.loaderTextDOM.text(Math.floor(p*100) + "%");	
	}
	hide(){
		let timelime = new TimelineMax();
	
	    timelime.add(
	      TweenMax.to(this.progressionDOM, .5, {
	        height: "100%",
	        ease: Power2.easeInOut
	      }),
	      "start"
	    );	 
	    timelime.add(
	      TweenMax.to(this.loaderTextDOM, .25, {
	        x: -5,
	        css:{color:"#eee"},
	        ease: Power2.easeInOut	        
	      }),
	      "start+=0"
	    );	
	    timelime.add(
	      TweenMax.to(this.loaderDOM, .6, {
	        autoAlpha: 0,
	        ease: Power4.easeIn,
	        onComplete: () => {    
	       		$("body").addClass("loaded");
	       		this.destroy();
	        }
	      }),
	      "start+=0.85"
	    );	 
	}
	destroy(){
		this.loaderDOM.remove();
	}
}