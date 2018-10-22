<style>
	.donate_bar {
	text-align: center;
	margin-top: 5%
}

.donate_bar a.btn_donate {
	display: inline-block;
	width: 82px;
	height: 82px;
	margin-left: auto;
	margin-right: auto;
	background: url(http://img.t.sinajs.cn/t5/style/images/apps_PRF/e_media/btn_reward.gif)no-repeat;
	-webkit-transition: background 0s;
	-moz-transition: background 0s;
	-o-transition: background 0s;
	-ms-transition: background 0s;
	transition: background 0s
}

.donate_bar a.btn_donate:hover {
	background-position: 0 -82px
}

.donate_bar .donate_txt {
	display: block;
	color: #9d9d9d;
	font: 14px/2 "Microsoft Yahei"
}
.donate_bar.hidden{
	display: none
}

.post-donate{
	margin-top: 80px;
}

#donate_guide{
	height: 210px;
	width: 420px;
	margin: 0 auto;
}

#donate_guide img{
	height: 200px;
	height: 200px;
}
</style>

<! -- 添加捐赠图标 -->
<div class ="post-donate">
    <div id="donate_board" class="donate_bar center">
        <a id="btn_donate" class="btn_donate" href="javascript:;" title="打赏"></a>
        <br>
      </div>  
	<div id="donate_guide" class="donate_bar center hidden" >
		<!-- 支付宝打赏图案 -->
		<img src="http://7xq6al.com1.z0.glb.clouddn.com/alipay2.jpg" alt="alipay"> 
		<!-- 微信打赏图案 -->
		<img src="http://7xq6al.com1.z0.glb.clouddn.com/weixin.jpg" alt="weixin">  
    </div>
	<script type="text/javascript">
		document.getElementById('btn_donate').onclick = function(){
			$('#donate_board').addClass('hidden');
			$('#donate_guide').removeClass('hidden');
		}
	</script>
</div>
<! -- 添加捐赠图标 -->