/**
	 * 展开树
	 * @param treeId  
	 */
    function expand(treeId){
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        treeObj.expandAll(true);
    }
    
    /**
	 * 收起树：只展开根节点下的一级节点
	 * @param treeId
	 */
    function closeTree(treeId){
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        var nodeLength = nodes.length;
        for (var i = 0; i < nodeLength; i++) {
            if (nodes[i].id == '0') {
                //根节点：展开
                treeObj.expandNode(nodes[i], true, true, false);
            } else {
                //非根节点：收起
                treeObj.expandNode(nodes[i], false, true, false);
            }
        }
    }
    
    /**
     * 搜索树，高亮显示并展示【模糊匹配搜索条件的节点s】
     * @param treeId
	 * @param searchConditionId 文本框的id
     */
	function search(treeId, searchConditionId){
		//searchByFlag(treeId, searchConditionId, "");
		searchFilter(treeId, searchConditionId);
	}
    
    /**
     * 搜索树，高亮显示并展示【模糊匹配搜索条件的节点s】
     * @param treeId
     * @param searchConditionId		搜索条件Id
     * @param flag 					需要高亮显示的节点标识
     */
	function searchByFlag(treeId, searchConditionId, flag){
		//<1>.搜索条件
		var searchCondition = $('#' + searchConditionId).val();
		//<2>.得到模糊匹配搜索条件的节点数组集合
		var highlightNodes = new Array();
		if (searchCondition != "") {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			highlightNodes = treeObj.getNodesByParamFuzzy("name", searchCondition, null);
		}
		 //$.fn.zTree.init($("#" + treeId), setting, highlightNodes);
		//<3>.高亮显示并展示【指定节点s】
		highlightAndExpand(treeId, highlightNodes, flag);
	}
	
	/**
     * 搜索树，显示并展示【模糊匹配搜索条件的节点s】
     * @param treeId
     * @param searchConditionId		搜索条件Id
     */
	function searchFilter(treeId, searchConditionId){
		//<1>.搜索条件
		var searchCondition = $('#' + searchConditionId).val();
		//<2>.得到模糊匹配搜索条件的节点数组集合
		var highlightNodes = new Array();
		if (searchCondition != "") {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			highlightNodes = treeObj.getNodesByParamFuzzy("name", searchCondition, null);
		}

		//<3>.过滤显示并展示【指定节点s】
		filterNodesAndExpand(treeId, highlightNodes);
	}
	
	/**
	 * 搜索过滤结果显示并展示【指定节点s】
	 * @param treeId
	 * @param searchedNodes 需要显示的节点数组
	 */
	function filterNodesAndExpand(treeId, searchedNodes){
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		//<1>. 先把全部节点更新为隐藏
		treeObj.hideNodes(treeObj.transformToArray(treeObj.getNodes()));
		
		//<2>.收起树, 只展开根节点下的一级节点
		closeTree(treeId);
		
		//<3>.把指定节点的样式更新为高亮显示，并展开
		if (searchedNodes != null) {
			for (var i = 0; i < searchedNodes.length; i++) {
				// 展示节点 
				treeObj.showNode(searchedNodes[i]);
				
				// 当前节点的父节点的父节点....直到根节点，并展示
				var parentNode = searchedNodes[i].getParentNode();
				var parentNodes = getParentNodes(treeId, parentNode);
				
				treeObj.showNode(parentNode);
				treeObj.showNodes(parentNodes);
				
				treeObj.expandNode(parentNodes, true, false, true);
				treeObj.expandNode(parentNode, true, false, true);
			}
		}
	}
	
	/**
	 * 高亮显示并展示【指定节点s】
	 * @param treeId
	 * @param highlightNodes 需要高亮显示的节点数组
	 * @param flag			 需要高亮显示的节点标识
	 */
	function highlightAndExpand(treeId, highlightNodes, flag){
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		//<1>. 先把全部节点更新为普通样式
		var treeNodes = treeObj.transformToArray(treeObj.getNodes());
		for (var i = 0; i < treeNodes.length; i++) {
			treeNodes[i].highlight = false;
			treeNodes[i].isHidden = true;
			treeObj.updateNode(treeNodes[i]);
			
			treeObj.hideNode(treeNodes[i]);
		}
		//treeObj.hideNodes(treeNodes);
		
		//<2>.收起树, 只展开根节点下的一级节点
		closeTree(treeId);
		
		//<3>.把指定节点的样式更新为高亮显示，并展开
		if (highlightNodes != null) {
			for (var i = 0; i < highlightNodes.length; i++) {
				if (flag != null && flag != "") {
					if (highlightNodes[i].flag == flag) {
						//高亮显示节点，并展开
						highlightNodes[i].highlight = true;
						//treeNodes[i].isHidden = false;
						treeObj.updateNode(highlightNodes[i]);
						
						treeObj.showNode(highlightNodes[i]);
						
						//高亮显示节点的父节点的父节点....直到根节点，并展示
						var parentNode = highlightNodes[i].getParentNode();
						var parentNodes = getParentNodes(treeId, parentNode);
					
						treeObj.showNode(parentNode);
						//treeObj.showNodes(parentNodes);
						
						treeObj.expandNode(parentNodes, true, false, true);
						treeObj.expandNode(parentNode, true, false, true);
					}
				} else {
					//高亮显示节点，并展开
					highlightNodes[i].highlight = true;
					//treeNodes[i].isHidden = false;
					treeObj.updateNode(highlightNodes[i]);
					treeObj.showNode(highlightNodes[i]);
					
					//高亮显示节点的父节点的父节点....直到根节点，并展示
					var parentNode = highlightNodes[i].getParentNode();
					var parentNodes = getParentNodes(treeId, parentNode);
					
					treeObj.showNode(parentNode);
					
					treeObj.expandNode(parentNodes, true, false, true);
					treeObj.expandNode(parentNode, true, false, true);
					
				}
			}
		}
	}
	
	/**
	 * 递归得到指定节点的父节点的父节点....直到根节点
	 */
	function getParentNodes(treeId, node){
		if (node != null) {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			var parentNode = node.getParentNode();

			treeObj.showNode(parentNode);
			
			return getParentNodes(treeId, parentNode);
		} else {
			return node;
		}
	}
	
	/**
	 * 递归得到指定节点的父节点的父节点....直到根节点
	 * 显示
	 */
	function getParentNodesAndShow(treeId, node){
		if (node != null) {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			var parentNode = node.getParentNode();

			treeObj.showNode(parentNode);
			
			return getParentNodes(treeId, parentNode);
		} else {
			return node;
		}
	}
	
	/**
	 * 设置树节点字体样式
	 */
	function setFontCss(treeId, treeNode) {
		if (treeNode.id == 0) {
			//根节点
			return {color:"#333", "font-weight":"bold"};
		} else if (treeNode.isParent == false) {
			//叶子节点
			return (!!treeNode.highlight) ? {color:"#ff0000", "font-weight":"bold"} : {color:"#660099", "font-weight":"normal"};
		} else {
			//父节点
			return (!!treeNode.highlight) ? {color:"#ff0000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
		}
	}

	