<?php

require "conn.php";
if(isset($_POST['name'])&&isset($_POST['pwd'])){
    $username=$_POST['name'];
    $password=$_POST['pwd'];
    $res=$conn->query("select * from reg where username='$username' and password='$password'");
    if($res->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}