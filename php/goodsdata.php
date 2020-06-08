<?php
require "conn.php";
$goodsdata=$conn->query("select * from goods");
$arr=array();
for($i=0;$i<$goodsdata->num_rows;$i++){
    $arr[$i]=$goodsdata->fetch_assoc();
}
echo json_encode($arr);

