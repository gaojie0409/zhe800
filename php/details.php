<?php
require "conn.php";
if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $detail=$conn->query("select * from goods where sid='$sid'");
    echo json_encode($detail->fetch_assoc());
}