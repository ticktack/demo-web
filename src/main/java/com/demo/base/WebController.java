package com.demo.base;

import org.kungfu.rest.Rest;

import com.demo.config.WebConst;
import com.demo.version.Version;

import cn.dreampie.client.ClientResult;
import cn.dreampie.client.ClientUser;

public class WebController extends Rest {
	private static String baseURI = WebConst.SERVICE_BASE_RUI + Version.API_URI_V1;
	public WebController() {
		super(baseURI);
	}
	
	public WebController(String loginApi, ClientUser user) {
		super(baseURI, loginApi, user);
	}
	
	public void result(ClientResult cr, String redirectPath) {
		if (cr.getStatus().getCode() == 200) {
			redirect(redirectPath);
		}
		else {
			result(cr.getStatus().getCode(), cr.getStatus().getDesc(), cr.getResult());
		}
	}
}
