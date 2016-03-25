package com.demo.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;

public class WebBaseHandler extends Handler {
	
	@SuppressWarnings("deprecation")
	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
		
		String cxt = getContextAllPath(request);
		request.setAttribute("cxt", cxt);
		
		request.setAttribute("decorator", "none");
		response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
		response.setHeader("Pragma","no-cache"); //HTTP 1.0
		response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
		
		nextHandler.handle(target, request, response, isHandled);
	}
	
	/**
	 * 获取上下文URL全路径
	 * 
	 * @param request
	 * @return
	 */
	private static String getContextAllPath(HttpServletRequest request) {
		StringBuilder sb = new StringBuilder();
		sb.append(request.getScheme())
		.append("://")
		.append(request.getServerName())
		.append(":")
		.append(request.getServerPort())
		.append(request.getContextPath());
		String path = sb.toString();
		sb = null;
		return path;
	}
}
