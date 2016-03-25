package com.demo.module.adtadmdiv;

import com.demo.base.WebController;

public class AdtAdmDivController extends WebController {

	//private final String redirectPath = "/admdiv";
	
	public void index() {
		setAttr("curPage", getParaToInt(0,1));  
		
		render("index2.html");
	}
	
	public void search() {
		setAttr("curPage", getParaToInt(0,1));  
		
		render("index.html");
	}
	
	public void data() {
		renderJson(get("/admdiv/" + getParaToInt(0,1)));
		//renderJson(get("/admdiv/" + getParaToInt(0,1) +"-"+ getPara(1, "")));
	}
	
	public void listdata() {
		renderJson(get("/admdiv/list"));
	}
	
}
