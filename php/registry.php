<?php
require "conn.php";
if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $tel=$_POST['tel'];
    $conn->query("insert reg values(null,'$username','$username','$password','$password',NOW())");
    header('location:http://192.168.31.124/zhe800/dist/login.html');
}
if(isset($_GET['name'])){//判断用户名是否有值传入
    $name=$_GET['name'];
    $res=$conn->query("select * from reg where username='$name'");
    if($res->fetch_assoc()){//判断用户名是否有重复的
        echo false;//有重复
    }else{
        echo true;//没有重复
    }
}