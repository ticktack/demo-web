package com.demo.module.blog;

import java.util.Map;

import com.demo.base.WebController;
import com.demo.blog.Blog;
import com.jfinal.kit.JsonKit;

import cn.dreampie.client.ClientResult;

/**
 * BlogController
 */
public class BlogController extends WebController {
	private final String redirectPath = "/blog";
	
	public void index() {
		//render("index.html");
	}
	
	public void query() {
		renderJson(get("/blog/" + getParaToInt("pageNo",1)));
	}
	
	public void add() {
		//render("add.html");
	}
	
	//@Before(BlogValidator.class)
	public void save() {
		String jsonStr = JsonKit.toJson(getBean(Blog.class,""));
		Map<String, String> params = getParams("blog", jsonStr);
		
		ClientResult cr = post("/blog/save", params);
		
		result(cr, redirectPath);
	}
	
	public void model() {
		renderJson(get("/blog/edit/" + getParaToInt(0)));
	}

	public void edit() {
		setAttr("id", getParaToInt(0));  
		render("edit.html");
	}
	
	//@Before(BlogValidator.class)
	public void update() {
		String jsonStr = JsonKit.toJson(getBean(Blog.class,""));
		Map<String, String> params = getParams("blog", jsonStr);
		
		ClientResult cr = put("/blog/update", params);
		
		result(cr, redirectPath);
	}
	
	public void delete() {
		ClientResult cr = delete("/blog/delete/" + getParaToInt(0));
		
		result(cr, redirectPath);
	}
}


