package com.demo.routes;

import com.demo.module.adtadmdiv.AdtAdmDivController;
import com.demo.module.blog.BlogController;
import com.demo.module.index.IndexController;
import com.jfinal.config.Routes;

public class WebRoutes extends Routes {
	
	public void config() {
		
		add("/", IndexController.class, "/web/module/index");	// 第三个参数为该Controller的视图存放路径
		add("/blog", BlogController.class, "/web/module/blog"); // 第三个参数省略时默认与第一个参数值相同，在此即为 "/blog"
		add("/admdiv", AdtAdmDivController.class, "/web/module/admdiv"); 
		
	}
}