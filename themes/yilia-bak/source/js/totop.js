(function($) {
	var obtn = document.getElementById("totop");
	//获取页面可视区的高度
	var clientHeight = document.documentElement.clientHeight;
	var timer = null; 
	var isTop = true; //回到顶部的过程中如果滚动鼠标滚条会暂停
	
	//滚动条滚动时触发
	window.onscroll = function(){
		//获取滚动条距离顶部的高度，IE:document.documentElement.scrollTop  chrome:document.body.scrollTop
		//var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		var osTop = $(document).scrollTop();  //jquery
		if(osTop >= clientHeight){
			obtn.style.display = 'block';
		}else{
			obtn.style.display = 'none';
		}
		if(!isTop){
			clearInterval(timer);
		}
		isTop = false;
	}
	
	obtn.onclick = function(){
		//设置定时器
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor(-osTop / 6);  //速度随距离动态变化，越来越小
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			isTop = true;
			if(osTop == 0){
				clearInterval(timer); //回到顶部时关闭定时器
			}
		},30)
	}
})(jQuery);