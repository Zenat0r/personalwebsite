import Page from "./page.es6";

export default class Portfolio extends Page{
	constructor(name, container){
		super(name, container);
	}
	show(callback){
		super.show(()=>{
			callback();
			this.initFront();
		});
	}
	hide(callback){
		let timelime = new TimelineMax();
		let speed = 0.2;

		timelime.add(
	      TweenMax.to($("#anim-projetPro"), 0, {
	        autoAlpha:1,
	        ease: Power4.linear  
	      }),
	      "start"
	    );	   
	    timelime.add(
	      TweenMax.to($("#anim-projetPro"), speed, {
	       	autoAlpha: 0,
	        ease: Power4.linear,
	        onComplete: () =>{
	        	super.hide(callback);
	        }
	      }),
	      "start"    
	    );	
	}
	initFront(){
		let timelime = new TimelineMax();
		let speed = 0.5;

		timelime.add(
	      TweenMax.to($("#anim-projetPro"), 0, {
	        y:-900,
	        ease: Power4.linear
	      }),
	      "start"
	    );	   
	    timelime.add(
	      TweenMax.to($("#anim-projetPro"), speed, {
	       	y: 0,
	        ease: Power4.linear
	      }),
	      "start"    
	    );
	}
}