

var oGameMenuBox = document.getElementById('gameMenu')

ajax({
	url: 'http://b9088.com/member/gamecategory/?mode=tree',
	success: function (resData) {
		var data
		try {
			data = JSON.parse(resData)
			console.log('哈哈哈哈')
			console.log(data)
			handleGameCategory(data)
		} catch(e) {
			// statements
			console.log(e);
		}
	},
	error: function (status) {
		console.log('error')
		console.log(status)
	}
})


function handleGameCategory (arr) {

	console.log('handleGameCategory')
	console.log(arr)
	if (!arr || !arr.length) return
	for(var i = 0; i < arr.length; i++) {
		var oLi = document.createElement('li')

		oLi.className = 'fl'

		var str = ''

		for(var j = 0; j < arr[i].provider.length; j++) {
			str += '<div class="item fl" data-providerid="'+arr[i].provider[j].id+'">\
						<img src="'+ arr[i].provider[j].icon +'" alt="">\
						<p>'+ arr[i].provider[j].name + arr[i].provider[j].category_type.slice(0, 2) +'</p>\
					</div>'
		}

		oLi.innerHTML = ''+ arr[i].name +'\
						<div class="drop-down">\
							<div class="game-category m-c clearfix">\
								'+ str +'\
							</div>\
						</div>\
\
						<div class="caret"></div>'

		oGameMenuBox.appendChild(oLi)
	}


	for(var i = 1; i < oGameMenuBox.children.length; i++) {
		oGameMenuBox.children[i].onmouseenter = function () {
			for(var i = 1; i < oGameMenuBox.children.length; i++) {
				oGameMenuBox.children[i].children[0].style.display = 'none'
			}
			this.children[0].style.display = 'block'
		}

		oGameMenuBox.children[i].onmouseleave = function () {
			this.children[0].style.display = 'none'
		}

	}

	var aDrops = document.getElementsByClassName('drop-down')
	var clientW = document.documentElement.clientWidth || document.body.clientWidth


	for(var i = 0; i < aDrops.length; i++) {
		aDrops[i].style.width = clientW + 'px'
		aDrops[i].style.left = - aDrops[i].parentNode.offsetLeft + 'px'
	}


	console.log('oGameMenuBox')
	console.log(oGameMenuBox)

	// 电子游戏下的 item
	var aItems = oGameMenuBox.children[2].getElementsByClassName('item')

	console.log('aItems')
	console.log(aItems)



	for(var i = 0; i < aItems.length; i++) {
		aItems[i].onclick = function () {
			var YOUGODATA = {
				providerId: this.getAttribute('data-providerid')
			}
			window.localStorage.setItem('providerId', JSON.stringify(YOUGODATA))
			window.open('/gamelist.html', '_self')
		}
	}

}