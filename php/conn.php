<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DATABADE','zhe800');
$conn=@new mysqli(HOST,USERNAME,PASSWORD,DATABADE);
if($conn->connect_error){
    die('链接错误'.connect_error);
}
