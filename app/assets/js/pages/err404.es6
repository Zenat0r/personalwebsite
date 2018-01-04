import Page from "./page.es6";

export default class Err404 extends Page{
	constructor(container){
		let name = "errors/404";
		super(name, container);	
	}
	show(callback){
		super.show(callback);
	}
}