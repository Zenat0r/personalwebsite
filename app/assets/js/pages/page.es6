export default class Page{
	constructor(name, container){
		this.htmlFile = name;
		this.htmlContainer = container;
	}
	destroy(){
		this.htmlContainer.empty();
	}
	hide(callback){
		this.destroy();
		callback();
	}
	show(callback){
		this.htmlContainer.attr('class', 'view-'+ this.htmlFile);
		this.htmlContainer.append("<div class='loader-view'>Christophe Sieradzki</div>");
		import("../../html/" + this.htmlFile + ".html").then((html)=>{
			this.htmlContainer.empty();
			this.htmlContainer.append(html);
			callback();
		});
	}
}