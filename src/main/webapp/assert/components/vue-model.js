// model component create by xiaofeixiang at 2016-01-26 14:50:08
var model = function(element, url, id) {
	var formModel = new Vue({
        el: element,
        ready: function() {
        	 if (id != null && id != '') 
        		 this.$http.get(url + id).then(function (res) {
	       		      console.log(res.data)
	       	    	  this.$data = res.data;
			      }, function (res) {
			          // handle error
			    	  console.log(res.data)
			      })
		},
		computed: {
			isUpdate : function() {
				if (id != null && id != '') {
	                   return true
	               }
	               return false
	          }
		}
		
	})
};