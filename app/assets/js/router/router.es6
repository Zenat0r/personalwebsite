import Err404 from "../pages/err404.es6";

export default class Router{
	constructor(hash , container){
		
		this.hash = hash.substring(1);
		if(this.hash === "") this.hash = "index";
		

		this.container = container; //jquery obj
	
		this.prePage = null;
		this.page = null;

		this.bindLinks();
		this.initUrlChange();

		this.firstLoad();
	}

	initUrlChange(){
	    window.addEventListener('popstate', this.routeUpdate.bind(this));
	}

	bindLinks(){
		$('a:not([target])').on("click", this.onAppClick.bind(this));
		$('.view-back-button').on("click", () => {this.backLink()});
	}

	onAppClick(e){
		e.preventDefault();

		let href = e.currentTarget.getAttribute('href');
		let hash = href;

		window.history.pushState(null, null, hash); //bug historique
		this.routeUpdate();
	}

	routeUpdate(){
		this.prePage = this.page;

		/**Url apres le changement de l'historie**/
		let url = window.location.href;		
		let _hash = url.split(url.split('/')[2])[1];

		this.hash = _hash.substring(1);
		if(this.hash === "") this.hash = "index";

		/**new page loading**/
		let pageClass;

		if(window.sitemap.pages[this.hash]){
			pageClass = window.sitemap.pages[this.hash].class;
			this.page = new pageClass.default(this.hash, this.container);
			this.prePage.hide(()=>{
				$("body").css("background-image", "none");
				this.page.show(()=>{					
					this.bindLinks(); //rafréchisement des links
				});
			});
			/**view chargé**/
		}else{
			this.show404(false);
		}
	}

	firstLoad(){
		let pageClass;

		if(window.sitemap.pages[this.hash]){
			pageClass = window.sitemap.pages[this.hash].class;
			this.page = new pageClass.default(this.hash, this.container);
			this.page.show(()=>{
				this.bindLinks(); //rafréchisement des links
			});
		}else{
			this.show404(true);
		}

		/**view chargé**/

		this.bindLinks(); //rafréchisement des links	
	}

	show404(isfirstLoad){
		this.page = new Err404(this.container);
		if(isfirstLoad){
			this.page.show(()=>{				
				this.bindLinks(); //rafréchisement des links
			});
		}else{
			this.prePage.hide(()=>{
				$("body").css("background-image", "none");
				this.page.show(()=>{					
					this.bindLinks(); //rafréchisement des links
				});
			});
		}		
	}
	backLink(){
		window.history.back();
	}
}
/*
import("../html/test.html").then((html)=>{
	console.log(html);
});*/