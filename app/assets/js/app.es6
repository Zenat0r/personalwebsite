import $ from "jquery";

import Router from "./router/router.es6";
import Loader from './module/loader.es6'
import Form from './module/form.es6'
import css from "../css/site.scss";
/**
	Fonction de l'objet :
		- Charger la premiere page
		- Ecouter les clicks chargé les pages en fonction du clique
**/
class App{
	constructor(){
		window.sitemap = require("./router/sitemap.es6");
		window.$ = $; //évider d'importer tout le temps

		let url = window.location.href;
		let _hash = url.split(url.split('/')[2])[1];

		this.loader = new Loader();
		this.form = new Form();

		this.router = new Router(_hash, $("#app-dynamic"));

		this.headerShowed = true;
		this.footerShowed = false;

		this.initFront();
		this.initFormEvent();
	}
	initFront(){
		$(".hide-header").on("click", ()=>{this.headerEventManager()});
		$("#show-header").on("click", ()=>{this.headerEventManager()});
		$("#show-footer").on("click", ()=>{this.footerEventManager()});		
	}
	initFormEvent(){
		$("form").submit((e)=>{
			e.preventDefault();
			this.form.send();
		});
	}
	headerEventManager(){
		if(this.headerShowed){
			$("header").animate({
				top: "-80%"
			},1500, this.init_footer());

			this.headerShowed = false;
		}else{
			if(this.footerShowed){
				this.footerEventManager();
				setTimeout(()=>{this.headerEventManager()}, 1000);
			}else{
				$("header").animate({
				top: "0"
			},1500, this.reset_footer());

			this.headerShowed = true;
			}			
		}		
	}
	init_footer(){
		$("footer .slide").css("transform", "rotate(-5.7deg) translateY(0)");
	}
	reset_footer(){
		$("footer .slide").css("transform", "rotate(-5.7deg) translateY(100%)");
	}
	footerEventManager(){		
		if(this.headerShowed){
			this.headerEventManager();
			setTimeout(()=>{this.footerAction()}, 1400);
		}else{
			this.footerAction();
		}
	}
	footerAction(){
		if(this.footerShowed){
			$("footer").attr("class", "");
			this.footerShowed = false;
		}else{
			$("footer").attr("class", "actif");
			this.footerShowed = true;
		}
	}

	bgTrigger(e){
		console.log("lol");
		$("body").css("background-image", e.currentTarget.src('href'));
	}	
}

$(document).ready(function(){
	var app = new App();
})