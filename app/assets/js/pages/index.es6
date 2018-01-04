import Page from "./page.es6";

export default class Index extends Page{
	constructor(name, container){
		super(name, container);
	}
	show(callback){
		super.show(()=>{
			callback();
			this.initFront();
		});		
	}

	initFront(){
		$(".bg-trigger").hover((e)=>{this.bgTrigger(e)});

		let timelime = new TimelineMax();
		let speed = 0.5;

		timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(0), 0, {
	        y:-600,
	        ease: Power4.linear       
	      }),
	      "start"
	    );
	    timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(1), 0, {
	        y:+600,
	        ease: Power4.linear
	      }),
	      "start"    
	    );
	    timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(0), speed, {
	        y:0,
	        ease: Power4.linear
	      }),
	      "start"    
	    );
	    timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(1), speed, {
	        y:0,
	        ease: Power4.linear
	      }),
	      "start"    
	    );
	}

	bgTrigger(e){
		$("body").css("background-image", "url(" + e.currentTarget.getAttribute('src') + ")");
	}
	hide(callback){
		let timelime = new TimelineMax();
		let speed = 0.75;

		timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(0), speed, {
	        y:-600,
	        ease: Power4.linear       
	      }),
	      "start"
	    );
	    timelime.add(
	      TweenMax.to($("#app-dynamic .row").get(1), speed, {
	        y:+600,
	        ease: Power4.linear,
	        onComplete: () => {	       		
	       		super.hide(callback);
	        }
	      }),
	      "start"    
	    );
	}
}