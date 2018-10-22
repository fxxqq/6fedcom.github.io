<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="icon-next-heart fa fa-heart"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
    <p style="margin-left:13px; position:relative;top:29px;display:inline-block;">
     <a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=9cTCxMzDw8fFwsa1hITblpqY" style="text-decoration:none;">
         <img src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_01.png"/>
      </a>
  </p>
</div>

<p style="margin-left:10px;width:60px;height:30px;display:inline-block;margin-top:10px;">
	<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1260404165'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260404165%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
</p>
<p style="position:relative;top:-4px;width:100px;height:30px;margin-left:10px;color:red;display:inline-block;"><a href="http://ta.qq.com" target="_blank"><img class="fenxi" src="http://tcss.qq.com/icon/toss_21.gif" alt="腾讯分析"></a></p>


{% block footer %}{% endblock %}
