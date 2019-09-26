<?php
//服务器本地仓库路径，填写仓库入口目录
$local = '/alidata1/www/web/';
//github远程仓库地址
$remote = 'https://github.com/ru23/ru23.github.io';
//密钥，github是密钥，验证方式跟gitee不一样
//请注意，这里设置的密钥稍后在github网站设置的时候需要用到
$secret = 'password';
//获取请求参数
$request = file_get_contents('php://input');
if (empty($request)) {
    die('request is empty');
}
//获取http 头
$headers = getHeaders();
//github发送过来的签名
$hubSignature = $headers['X-Hub-Signature'];
list($algo, $hash) = explode('=', $hubSignature, 2);
// 计算签名
$payloadHash = hash_hmac($algo, $request, $secret);
// 判断签名是否匹配
if ($hash != $payloadHash) {
    die('secret is error');
}
// echo shell_exec("cd {$local} && /usr/bin/git pull {$remote} 2>&1");
// /root/github_synch.sh 是在服务器上面的一个拉取仓库文件的脚本。
echo shell_exec("/root/github_synch.sh");
die('done ' . date('Y-m-d H:i:s', time()));
/**
 * @todo 获取头信息
*/
function getHeaders()
{
    $headers = array();
    //Apache服务器才支持getallheaders函数
    if (!function_exists('getallheaders')) {
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
    } else {
        $headers = getallheaders();
    }
    return $headers;
}