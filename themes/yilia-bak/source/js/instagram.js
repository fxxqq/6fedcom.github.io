define([], function (){
	
	var _collection = [];
	var _count = 0;
	var PHOTO_URL = "http://7xoqky.com1.z0.glb.clouddn.com/";
	
	/*获取保存相片信息的jason文件，data 里面保存的是jason数据*/
	var getPhotoData = function(){
		var data;
		$.ajaxSetup({ async :false});
		$.getJSON('data.json').success(function(content){ 
			data = content;
		}); 
		return data;
	}
	
	/*拼装html代码显示照片*/
	var render = function(data){
		var ulTmpl = "";
		for(var em in data){
			var liTmpl = "";
			for(var i=0,len=data[em].srclist.length;i<len;i++){
				liTmpl += '<li>\
								<div class="img-box">\
									<a class="img-bg" rel="example_group" href="'+data[em].srclist[i]+'" title="'+data[em].text[i]+'"></a>\
									<img lazy-src="'+data[em].srclist[i]+'" alt="">\
								</div>\
							</li>';
			}
			ulTmpl = ulTmpl + '<section class="archives album"><h1 class="year">'+data[em].year+'<em>'+data[em].month+'月</em><strong> '+data[em].place+' </strong> </h1>\
				<ul class="img-box-ul">'+liTmpl+'</ul>\
				</section>';
		}
		$(ulTmpl).appendTo($(".instagram"));
		changeSize();
		
		$(".instagram").lazyload();
		
		$("a[rel=example_group]").fancybox();
	}
	
	/*根据相片信息给照片归类*/
	var ctrler = function(data){
		var imgObj = {};
		for(var i=0,len=data.length;i<len;i++){
			var y = data[i].y;
			var m = data[i].m;
			var p = data[i].p;
			var src = PHOTO_URL + data[i].src;
			var text = data[i].text;
			var key = y+""+((m+"").length == 1?"0"+m : m)+""+p;
			if(imgObj[key]){
				imgObj[key].srclist.push(src);
				imgObj[key].text.push(text);
			}else{				
				imgObj[key] = {
					year:y,
					month:m,
					place:p,
					srclist:[src],
					text:[text]
				}
			}
		}
		render(imgObj);
	}
	/*解析相片信息*/
	var serialize = function(data){
		for(var i=0,len=data.length;i<len;i++){
			var title = data[i].src;
			var regY = /([0-9]{4})/;
			data[i].y = regY.exec(title)[1];
			var regM = /[0-9]{4}([0-9]{2})/;
			data[i].m = regM.exec(title)[1];
			var regP = /[0-9]{6}(.*?)[0-9]{2}/;
			data[i].p = regP.exec(title)[1];
		}
		return data;
	}
	
	/*获取和显示相册*/
	var getAlbum = function(){
		var photoData = getPhotoData();
		photoData = serialize(photoData);
		ctrler(photoData);
	}
	
	/*调整相片大小*/
	var changeSize = function(){	
		if($(document).width() <= 600){
			$(".img-box").css({"width":"auto", "height":"auto"});
		}else{
			var width = $(".img-box-ul").width();
			var size = Math.max(width*0.20, 105);   //var size = Math.max(width*0.26, 157);
			$(".img-box").width(size).height(size);
		}
		$('.instagram img').each(function() {
			
			/* 强制指定大小 */
			$(this).css("height", size);
			$(this).css("width", size); 
			
			/* 等比例缩放*/
			/*
			var ratio = 0;  // 缩放比例
			var width = $(this).width();    // 图片实际宽度
			var height = $(this).height();  // 图片实际高度
			// 检查图片是否超宽
			if(width > size){
				ratio = size / width;   // 计算缩放比例
				$(this).css("width", size); // 设定实际显示宽度
				height = height * ratio;    // 计算等比例缩放后的高度 
				$(this).css("height", height);  // 设定等比例缩放后的高度
			}
			// 检查图片是否超高
			if(height > size){
				ratio = size / height; // 计算缩放比例
				$(this).css("height", size);   // 设定实际显示高度
				width = width * ratio;    // 计算等比例缩放后的高度
				$(this).css("width", width * ratio);    // 设定等比例缩放后的高度
			}
			*/
		})
	}
	
	var bind = function(){
		$(window).resize(function(){
			changeSize();
		});
	}
	function stop(){
		return false;
	}
	return {
		init:function(){
			getAlbum();
			bind();
			document.oncontextmenu = stop; //禁用鼠标右键
		}
	}
});