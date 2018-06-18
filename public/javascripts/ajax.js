function json2url (data) {
	var str = ''
	var n = 0
	var len = Object.keys(data).length
	for(var name in data) {
		n++
		str+=name
		str+='='
		str+=data[name]

		if (n !== len) {
			str+='&'
		}
	}

	return str
}

function ajax (json) {
	if (!json.url) return

	var type = json.type || 'get'
	var data = json.data || {}


	// 1 建立连接

	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest()
	} else {
		var oAjax= new ActiveXObject('Microsoft.XMLHTTP');
	}

	if (type.toLowerCase() === 'get') {
		oAjax.open('get', json.url + '?' + json2url(data))
		oAjax.send()

	} else {
		oAjax.open('post', json.url, true)
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		console.log('post data')
		console.log(json2url(data))
		oAjax.send(json2url(data))
	}

	// 3 坐等后端响应

	oAjax.onreadystatechange = function () {
		if(oAjax.readyState==4){
		    if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){

		        json.success && json.success(oAjax.responseText)
		    }else{
		       json.error && json.error(oAjax.status)
		    }
		}
	}

}